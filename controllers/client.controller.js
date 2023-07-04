const pool = require("../config/db");
const DeviceDetector = require("node-device-detector");

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: false,
});

const addClient = async (req, res) => {
  try {
    const {
      client_last_name,
      client_first_name,
      client_phone_number,
      client_info,
      client_photo,
    } = req.body;

    const newClient = await pool.query(
      `
        INSERT INTO client (client_last_name,client_first_name,
            client_phone_number,client_info,client_photo)
            values($1, $2, $3, $4, $5) RETURNING *
        `,
      [
        client_last_name,
        client_first_name,
        client_phone_number,
        client_info,
        client_photo,
      ]
    );
    console.log(newClient);
    res.status(200).json(newClient.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

const getClient = async (req, res) => {
  try {
    const userAgent = req.headers["user-agent"]
    console.log(userAgent)
    const result = detector.detect(userAgent)
    console.log("result parse", result)
    // console.log(DeviceHelper.isDesktop(result))
    const clients = await pool.query(`select * from client`);
    res.status(200).send(clients.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error)
  }
};

const deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    const clients = await pool.query(`DELETE FROM client WHERE id = $1`, [id]);
    res.status(200).json("Successfully deleted");
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const updateClient = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      client_last_name,
      client_first_name,
      client_phone_number,
      client_info,
      client_photo,
    } = req.body;

    const newClient = await pool.query(
      `
        UPDATE client set client_last_name = $1, client_first_name = $2,
            client_phone_number = $3,client_info = $4, client_photo = $5
            WHERE id = $6
            RETURNING *
        `,
      [
        client_last_name,
        client_first_name,
        client_phone_number,
        client_info,
        client_photo,
        id,
      ]
    );
    res.status(200).json(newClient.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

module.exports = {
  addClient,
  getClient,
  updateClient,
  deleteClient,
};
