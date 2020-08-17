create database CMotors;

create table users(
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