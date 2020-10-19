const { pool } = require("../database/config");
const {
  errorResponse,
  successResponse,
} = require("../utils/responseDictionaries");

const getCompanies = async (req, res) => {
  try {
    const lat = req.body.lat;
    const lng = req.body.lng;

    const response = await pool.query(
      "SELECT *, ROUND(((point($2, $1) <@>  (point(lon, lat)::point)) * 1.60934)::numeric,2) as distance FROM companies ORDER BY  distance asc",
      [lat, lng]
    );

    successResponse.data = response.rows.length == 0 ? null : response.rows;

    res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json(errorResponse);
  }
};

const getCompanyById = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await pool.query("SELECT * FROM companies WHERE id $1", [
      id,
    ]);

    successResponse.data = response.rows.length == 0 ? null : response.rows;

    res.status(200).json(successResponse);
  } catch (error) {
    res.status(500).json(errorResponse);
  }
};

const createCompany = async (req, res) => {
  try {
    const { name, address, lat, lon, logo, distance } = req.body;
    const response = await pool.query(
      "INSERT INTO companies (name, address, lat, lon, status, logo, distance) VALUES ($1, $2, $3, $4, '1', $5, $6) returning id",
      [name, address, lat, lon, logo, distance]
    );

    successResponse.message = "Company added successfully";
    successResponse.data = {
      id: response.rows[0].id,
      name: name,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    res.status(500).json(errorResponse);
  }
};

module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
};
