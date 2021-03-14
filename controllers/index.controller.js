const { pool } = require("../database/config");
const {
  errorResponse,
  successResponse,
} = require("../utils/responseDictionaries");

const getUsers = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM users ORDER BY id ASC");

    successResponse.data = response.rows.length == 0 ? null : response.rows;

    res.status(200).json(successResponse);
  } catch (error) {
    res.status(500).json(errorResponse);
  }
};

const getUserById = async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email;

    const response = await pool.query(
      "SELECT * FROM users WHERE email = $1 and password = $2",
      [email, password]
    );

    successResponse.data = response.rows.length == 0 ? null : response.rows[0];

    if (response == null || response.rows.length == 0) {
      successResponse.message = "User or Password incorrect";
      res.status(200).json(successResponse);
    } else {
      res.status(200).json(successResponse);
    }
  } catch (error) {
    res.status(500).json(errorResponse);
  }
};

const createUser = async (req, res, next) => {
  console.log(req.file, req.body);
  var filename = "";

  try {
    const { name, email, address, phone, password, lastname } = req.body;

    const response1 = await pool.query(
      "SELECT * FROM users WHERE email = $1 ",
      [email]
    );

    if (
      response1 != null &&
      response1.rows != null &&
      response1.rows.length > 0
    ) {
      successResponse.message = "There is already a user with that email";
      successResponse.isSuccessFul = false;

      res.status(200).json(successResponse);
    } else {
      if (req.file.size > 1000) {
        filename = "uploads/" + req.file.filename;
      } else {
        filename = "empty";
      }

      const response = await pool.query(
        "INSERT INTO users (name, email, password, address, status, lastname, img, phone) VALUES ($1, $2, $3, $4, '1', $5, $6, $7) returning id",
        [name, email, password, address, lastname, filename, phone]
      );

      successResponse.message = "User Added successfully";
      successResponse.data = {
        id: response.rows[0].id,
        name: name,
        email: email,
        address: address,
        phone: phone,
        status: "1",
        password: password,
        img: filename,
        lastname: lastname,
      };

      res.status(200).json(successResponse);
    }
  } catch (error) {
    res.status(500).json(errorResponse);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
