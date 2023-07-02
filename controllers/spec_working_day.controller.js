const pool = require("../config/db");
const addWorkingDay = async (req, res) => {
  try {
    const {
      spec_id,
      day_of_week,
      start_time,
      finish_time,
      rest_start_time,
      rest_finish_time,
    } = req.body;

    const newWorkingDay = await pool.query(
      `
        INSERT INTO spec_working_day (spec_id,day_of_week,start_time,finish_time,rest_start_time,rest_finish_time)
        values($1, $2, $3, $4, $5, $6) RETURNING *
        `,
      [
        spec_id,
        day_of_week,
        start_time,
        finish_time,
        rest_start_time,
        rest_finish_time,
      ]
    );
    console.log(newWorkingDay);
    res.status(200).json(newWorkingDay.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

const getWorkingDay = async (req, res) => {
  try {
    const workingDay = await pool.query(`select * from spec_working_day`);
    res.status(200).send(workingDay.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const deleteWorkingDay = async (req, res) => {
  try {
    const id = req.params.id;
    const workingDay = await pool.query(
      `DELETE FROM spec_working_day WHERE id = $1`,
      [id]
    );
    res.status(200).json("Successfully deleted");
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const updateWorkingDay = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      spec_id,
      day_of_week,
      start_time,
      finish_time,
      rest_start_time,
      rest_finish_time,
    } = req.body;

    const newWorkingDay = await pool.query(
      `
        UPDATE spec_working_day set spec_id = $1,day_of_week = $2,start_time = $3,finish_time = $4, rest_start_time = $5, rest_finish_time = $6
            WHERE id = $7
            RETURNING *
        `,
      [
        spec_id,
        day_of_week,
        start_time,
        finish_time,
        rest_start_time,
        rest_finish_time,
        id,
      ]
    );
    res.status(200).json(newWorkingDay.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

module.exports = {
  addWorkingDay,
  getWorkingDay,
  updateWorkingDay,
  deleteWorkingDay,
};
