-- car must be created first!
CREATE TABLE car
(
	car_uuid UUID NOT NULL PRIMARY KEY,
	make VARCHAR(100) NOT NULL,
	model VARCHAR(100) NOT NULL,
	price NUMERIC(19, 2) NOT NULL
);

CREATE TABLE person
(
	person_uuid UUID NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	gender VARCHAR(7) NOT NULL,
	email VARCHAR(100),
	date_of_birth DATE NOT NULL,
	country_of_birth VARCHAR(50) NOT NULL,
	car_uuid UUID REFERENCES car (car_uuid),
	UNIQUE(car_uuid)
);

INSERT INTO person
	(person_uuid, first_name, last_name, gender, email, date_of_birth, country_of_birth)
VALUES
	(uuid_generate_v4(), 'John', 'Doe', 'Male', 'johndoe@example.com', '1967-04-03', 'England');

INSERT INTO person
	(person_uuid, first_name, last_name, gender, email, date_of_birth, country_of_birth)
VALUES
	(uuid_generate_v4(), 'Jane', 'Smith', 'Female', 'janesmith@example.com', '1992-05-13', 'Russia');

INSERT INTO person
	(person_uuid, first_name, last_name, gender, email, date_of_birth, country_of_birth)
VALUES
	(uuid_generate_v4(), 'Billy', 'Bob', 'Male', null, '1955-12-31', 'United States');

INSERT INTO car
	(car_uuid, make, model, price)
VALUES
	(uuid_generate_v4(), 'Land Rover', 'Sterling', '87668.38');

INSERT INTO car
	(car_uuid, make, model, price)
VALUES
	(uuid_generate_v4(), 'GMC', 'Acadia', '17662.68');