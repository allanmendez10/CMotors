const { Pool } = require('pg')

const pool = new Pool({
        user: 'hsufhgxbbmkzys',
        host: 'ec2-3-214-4-151.compute-1.amazonaws.com',
        password: 'a39f3df7b52d02298a0b88395253e7283b807c39194834aed25542d04083a07c',
        database: 'd2drtgcfq0pq7e',
        port: '5432',

    })
    /*
     id serial primary key,
        name varchar(40),
        email text,
        address varchar(100),
        phone varchar(10),
        status varchar(10),
        password varchar(50),
        img text,
        lastname varchar(20)
    ); 
    */

const getCompanies = async(req, res) => {
    try {

        //  const response = await pool.query('SELECT to_json(r) FROM (SELECT * FROM users ORDER BY id ASC) r');
        const response = await pool.query('SELECT * FROM companies ORDER BY id ASC');

        res.status(200).json({
            message: 'Successful',
            isSuccessFul: true,
            status: 200,
            data: response.rows.length == 0 ? null : response.rows
        });

    } catch (error) {

        res.status(500).json({
            message: error,
            isSuccessFul: false,
            status: 500,
            data: null
        }).status(408).json({
            message: 'Request timeout',
            isSuccessFul: false,
            status: 408,
            data: null
        }).status(404).json({
            message: 'Not found',
            isSuccessFul: false,
            status: 404,
            data: null
        });
    }
};

const getCompanyById = async(req, res) => {

    try {
        const id = req.params.id;

        const response = await pool.query("SELECT * FROM companies WHERE id $1", [id]);
        res.status(200).json({
            message: 'Success',
            isSuccessFul: true,
            status: 200,
            data: response.rows.length == 0 ? null : response.rows[0]
        }).status(408).json({
            message: 'Request timeout',
            isSuccessFul: false,
            status: 408,
            data: null
        }).status(404).json({
            message: 'Not found',
            isSuccessFul: false,
            status: 404,
            data: null
        });

    } catch (error) {
        res.status(500).json({
            message: error,
            isSuccessFul: false,
            status: 500,
            data: null
        })
    }
};

const createCompany = async(req, res) => {

    try {
        const { name, address, lat, lon, logo, distance } = req.body;
        const response = await pool.query("INSERT INTO companies (name, address, lat, lon, status, logo, distance) VALUES ($1, $2, $3, $4, '1', $5, $6) returning id", [name, address, lat, lon, logo, distance]);
        res.status(200).json({
            message: 'Company added successfully',
            isSuccessFul: true,
            status: 200,
            data: {
                id: response.rows[0].id,
                name: name,
            }
        }).status(408).json({
            message: 'Request timeout',
            isSuccessFul: false,
            status: 408,
            data: null
        }).status(404).json({
            message: 'Not found',
            isSuccessFul: false,
            status: 404,
            data: null
        });

    } catch (error) {

        res.status(500).json({
            message: error,
            isSuccessFul: false,
            status: 500,
            data: null
        })

    }


};

module.exports = {
    getCompanies,
    getCompanyById,
    createCompany
};