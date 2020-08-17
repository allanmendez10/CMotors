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

const getUsers = async(req, res) => {
    try {

        //  const response = await pool.query('SELECT to_json(r) FROM (SELECT * FROM users ORDER BY id ASC) r');
        const response = await pool.query('SELECT * FROM users ORDER BY id ASC');

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

const getUserById = async(req, res) => {

    try {
        const password = req.body.password;
        const email = req.body.email;

        const response = await pool.query("SELECT * FROM users WHERE email = $1 and password = $2", [email, password]);
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

const createUser = async(req, res) => {

    try {

        const { name, email, address, phone, password, img, lastname } = req.body;

        const response1 = await pool.query("SELECT * FROM users WHERE email = $1 ", [email]);

        if (response1 != null && response1.rows != null && response1.rows.length > 0) {
            res.status(200).json({
                message: 'There is already a user with that email',
                isSuccessFul: false,
                status: 200,
                data: null
            })
        } else {

            const response = await pool.query("INSERT INTO users (name, email, password, address, status, lastname, img, phone) VALUES ($1, $2, $3, $4, '1', $5, $6, $7) returning id", [name, email, password, address, lastname, img, phone]);
            res.status(200).json({
                message: 'User Added successfully',
                isSuccessFul: true,
                status: 200,
                data: {
                    id: response.rows[0].id,
                    name: name,
                    email: email,
                    address: address,
                    phone: phone,
                    status: '1',
                    password: password,
                    img: img,
                    lastname: lastname
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
        }
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
    getUsers,
    getUserById,
    createUser
};