const pool = require("../config/db");
const addSpecSocial = async (req, res) => {
  try {
    const { spec_id, social_id } = req.body;

    const newSpecSocial = await pool.query(
      `
        INSERT INTO spec_social (spec_id, social_id)
        values($1, $2) RETURNING *
        `,
      [spec_id, social_id]
    );
    console.log(newSpecSocial);
    res.status(200).json(newSpecSocial.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

const getSpecSocial = async (req, res) => {
  try {
    const specSocials = await pool.query(`select * from spec_social`);
    res.status(200).send(specSocials.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const deleteSpecSocial = async (req, res) => {
  try {
    const id = req.params.id;
    const specSocials = await pool.query(
      `DELETE FROM spec_social WHERE id = $1`,
      [id]
    );
    res.status(200).json("Successfully deleted");
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const updateSpecSocial = async (req, res) => {
  try {
    const id = req.params.id;
    const { spec_id, social_id } = req.body;

    const newSpecSocial = await pool.query(
      `
        UPDATE spec_social set spec_id = $2, social_id = $2
        WHERE id = $3
            RETURNING *
        `,
      [spec_id, social_id, id]
    );
    res.status(200).json(newSpecSocial.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

module.exports = {
  addSpecSocial,
  getSpecSocial,
  updateSpecSocial,
  deleteSpecSocial,
};
