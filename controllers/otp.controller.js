const { encode, decode } = require("../services/crypt");
const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const otpGenerator = require("otp-generator");
const { addMinutesToDate } = require("../helpers/addMinutesToDate");
const { dates } = require("../helpers/dates");
const myJwt = require("../services/JwtService");

//     new OTP
const newOtp = async (req, res) => {
  const { phone_number } = req.body;
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const now = new Date();
  const expiration_time = addMinutesToDate(now, 3);

  const newOtp = await pool.query(
    `INSERT INTO otp (id, otp, expiration_time) VALUES($1,$2,$3) returning id;`,
    [uuidv4(), otp, expiration_time]
  );

  const details = {
    timestamp: now,
    check: phone_number,
    success: true,
    message: "OTP sent to user",
    otp_id: newOtp.rows[0].id,
  };
  const encoded = await encode(JSON.stringify(details));
  return res.send({ Status: "Success", Details: encoded });
};

const verifyOtp = async (req, res) => {
  const { verification_key, check, otp } = req.body;
  var currentDate = new Date();
  let decoded;
  try {
    decoded = await decode(verification_key);
  } catch (error) {
    const response = { Status: "Failure", Details: "Bad Request" };
    return res.status(400).send(response);
  }
  var obj = JSON.parse(decoded);
  const check_obj = obj.check;
  console.log(obj);
  if (check_obj != check) {
    const response = {
      Status: "Failure",
      Details: "OTP was not sent to this particular phone number",
    };
    return res.status(400).send(response);
  }
  const otpResult = await pool.query(`select * from otp where id=$1;`, [
    obj.otp_id,
  ]);
  const result = otpResult.rows[0];
  if (result != null) {
    if (result.verified != true) {
      if (dates.compare(result.expiration_time, currentDate) == 1) {
        if (otp === result.otp) {
          await pool.query(`update otp set verified=$2 where id=$1;`, [
            result.id,
            true,
          ]);
          const clientResult = await pool.query(
            `select * from client where client_phone_number=$1;`,
            [check]
          );
          let client_id, details;

          if (clientResult.rows.length == 0) {
            const newClient = await pool.query(
              `INSERT INTO client (client_phone_number, otp_id) VALUES ($1, $2) returning id`,
              [check, obj.otp_id]
            );
            client_id = newClient.rows[0].id;
            details = "new";
          } else {
            client_id = clientResult.rows[0].id;
            details = "old";
            await pool.query(`UPDATE client SET otp_id=$2 WHERE id=$1`, [
              client_id,
              obj.otp_id,
            ]);
          }
          const payload = {
            id: client_id,
          };
          const tokens = myJwt.generateTokens(payload);
          const response = {
            Status: "Success",
            Details: details,
            Check: check,
            ClientID: client_id,
            tokens: tokens,
          };
          return res.status(200).send(response);
        } else {
          const response = { Status: "Failure", Details: "OTP not matched" };
          return res.status(400).send(response);
        }
      } else {
        const response = { Status: "Failure", Details: "OTP expired" };
        return res.status(400).send(response);
      }
    } else {
      const response = { Status: "Failure", Details: "OTP already used" };
      return res.status(400).send(response);
    }
  } else {
    const response = { Status: "Failure", Details: "Baf Request" };
    return res.status(400).send(response);
  }
};
// getotp

const getOtp = async (req, res) => {
  try {
    const otps = await pool.query(`select * from otp`);
    res.status(200).send(otps.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};
const getOtpById = async (req, res) => {
  try {
    const id = req.params.id;
    const otp = await pool.query(
      `
            select * from otp where id = $1
            `,
      [id]
    );
    res.status(200).send(otp.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const deleteOtp = async (req, res) => {
  try {
    const id = req.params.id;
    const otps = await pool.query(`DELETE FROM otp WHERE id = $1`, [id]);
    res.status(200).json("Successfully deleted");
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const updateOtp = async (req, res) => {
  try {
    const id = req.params.id;
    const { otp, expiration_time, verified } = req.body;

    const newOtp = await pool.query(
      `
        UPDATE otp set otp = $1,expiration_time = $2,verified = $3
            WHERE id = $4
            RETURNING *
        `,
      [otp, expiration_time, verified, id]
    );
    res.status(200).json(newOtp.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

module.exports = {
  newOtp,
  verifyOtp,
  getOtp,
  getOtpById,
  updateOtp,
  deleteOtp,
};
