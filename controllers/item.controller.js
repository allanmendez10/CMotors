const { pool } = require("../database/config");

const {
  errorResponse,
  successResponse,
} = require("../utils/responseDictionaries");

const getItems = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM items ORDER BY id ASC");

    successResponse.data = response.rows.length == 0 ? null : response.rows;

    res.status(200).json(successResponse);
  } catch (error) {
    res.status(500).json(errorResponse);
  }
};

const getItemsByIdCompany = async (req, res) => {
  try {
    const idCompany = req.params.id_company;

    const response = await pool.query(
      "SELECT * FROM items WHERE id_company = $1 and status = '1'",
      [idCompany]
    );

    successResponse.data = response.rows.length == 0 ? null : response.rows;

    res.status(200).json(successResponse);
  } catch (error) {
    res.status(500).json(errorResponse);
  }
};

const createItem = async (req, res) => {
  try {
    const { name, price, description, quantity, id_company } = req.body;
    const response = await pool.query(
      "INSERT INTO items (name, price, description, quantity, status, id_company) VALUES ($1, $2, $3, $4, '1', $5) returning id",
      [name, price, description, quantity, id_company]
    );

    successResponse.message = "Item Added successfully";
    successResponse.data = {
      id: response.rows[0].id,
      name: name,
      price: price,
      description: description,
      quantity: quantity,
      id_company: id_company,
      status: "1",
    };

    res.status(200).json(successResponse);
  } catch (error) {
    res.status(500).json(errorResponse);
  }
};

module.exports = {
  getItems,
  getItemsByIdCompany,
  createItem,
};
