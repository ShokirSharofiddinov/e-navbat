const pool = require("../config/db");
const addSpecSer = async (req, res) => {
  try {
    const { spec_id, service_id, spec_service_price } = req.body;

    const newSpecSer = await pool.query(
      `
        INSERT INTO spec_service (spec_id, service_id, spec_service_price)
        values($1, $2, $3) RETURNING *
        `,
      [spec_id, service_id, spec_service_price]
    );
    console.log(newSpecSer);
    res.status(200).json(newSpecSer.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

const getSpecSer = async (req, res) => {
  try {
    const specSers = await pool.query(`select * from spec_service`);
    res.status(200).send(specSers.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const deleteSpecSer = async (req, res) => {
  try {
    const id = req.params.id;
    const specSers = await pool.query(
      `DELETE FROM spec_service WHERE id = $1`,
      [id]
    );
    res.status(200).json("Successfully deleted");
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const updateSpecSer = async (req, res) => {
  try {
    const id = req.params.id;
    const { spec_id, service_id, spec_service_price } = req.body;

    const newSpecSer = await pool.query(
      `
        UPDATE spec_service set spec_id = $1,service_id = $2,spec_service_price = $3
            WHERE id = $4
            RETURNING *
        `,
      [spec_id, service_id, spec_service_price, id]
    );
    res.status(200).json(newSpecSer.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

module.exports = {
  addSpecSer,
  getSpecSer,
  updateSpecSer,
  deleteSpecSer,
};
