const { Pool } = require('pg')

const pool = new Pool({
    user: 'hsufhgxbbmkzys',
    host: 'ec2-3-214-4-151.compute-1.amazonaws.com',
    password: 'a39f3df7b52d02298a0b88395253e7283b807c39194834aed25542d04083a07c',
    database: 'd2drtgcfq0pq7e',
    port: '5432',

})

/*const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    database: 'CMotors',
    port: '5432',

})*/


const getItems = async(req, res) => {
    try {

        //  const response = await pool.query('SELECT to_json(r) FROM (SELECT * FROM users ORDER BY id ASC) r');
        const response = await pool.query('SELECT * FROM items ORDER BY id ASC');

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

const getItemsByIdCompany = async(req, res) => {

    try {
        const idCompany = req.params.id_company;

        const response = await pool.query("SELECT * FROM items WHERE id_company = $1 and status = '1'", [idCompany]);
        res.status(200).json({
            message: 'Success',
            isSuccessFul: true,
            status: 200,
            data: response.rows.length == 0 ? null : response.rows
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

const createItem = async(req, res) => {

    try {
        const { name, price, description, quantity, id_company } = req.body;
        const response = await pool.query("INSERT INTO items (name, price, description, quantity, status, id_company) VALUES ($1, $2, $3, $4, '1', $5) returning id", [name, price, description, quantity, id_company]);
        res.status(200).json({
            message: 'Item Added successfully',
            isSuccessFul: true,
            status: 200,
            data: {
                id: response.rows[0].id,
                name: name,
                price: price,
                description: description,
                quantity: quantity,
                id_company: id_company,
                status: "1"

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
    getItems,
    getItemsByIdCompany,
    createItem
};