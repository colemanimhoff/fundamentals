# Postgreql

## What is a Database

It is an organized collection of data.
It gives us a method of storing, manipulating, and retrieving data.

Types of databases:

- flat file
- document model databases (NoSQL)
- relational databases

## Relational Databases and SQL

Data is stored in tables (relations)
These tables can be "linked" together
Can identify data in relation to another piece of data in the database

#### Relational Database Management System (RDBMs)

Include MySQL, Oracle, and PostgreSQL
RDBMS allow us to interact with the database

#### SQL

- Structred Query Language
- It is the language for talking to relational databases.
- It is used to create tables, insert data, retrieve data, and much more.
- SQL queries are very similar acress different database systems.

## Database Tables

- Tables contain columns (fields) and rows of data (records)
- Each column has a defined data type which defines what type of data can be contained within that column.
- Each row of data should be unique.
- Each column should contain only one value per row.

## Data Types in PSQL

- int | used to store whole numbers | age, quantity
- numeric(P,S) | decimal numbers | height, price
- serial (specific to PSQL) | auto incrementing whole number | Id (primary key)

## Creating Databases

`CREATE DATABASE ${databaseName};`

or (while not connected to a database)
`createdb ${databaseName}`

## Connect to Databases

`psql --help`

`psql -h localhost -p 5432 -U colemanimhoff test`

Args: hostname, port (default), username, db name

If a database doesn't exist:

`psql: error: could not connect to server: FATAL: database "test1" does not exist`

If you are already connected to a db:

`\c the-poo-queue-v1`

## Help Menu

Once connected to a database, run `/?` to see a list of commands

## Delete Database

`DROP DATABASE ${databaseName}`

or (while not connected to a database)
`dropdb ${databaseName}`

### Create Table

via command line

`CREATE TABLE person (id INT,first_name VARCHAR(50), last_name VARCHAR(50), gender VARCHAR(7), date_of_birth DATE);`

### Drop Table

`test=# DROP TABLE person;`

### Specifying Table constraints

(BIGSERIAL autoincrements)

`CREATE TABLE person (id BIGSERIAL NOT NULL PRIMARY KEY, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, gender VARCHAR(7) NOT NULL, date_of_birth DATE NOT NULL, email VARCHAR(50));`

### Insert Records

`INSERT INTO person(first_name, last_name, gender, date_of_birth) VALUES ('Anne', 'Smith', 'FEMALE', date '1988-01-09');`

## Execute From File

`\i FILE`

## Select All Records from Table

`SELECT * FROM person;`

## Select Specific Columns from Records

`SELECT first_name FROM person`
`SELECT first_name, last_name FROM person`

If entries in a column are null, postgres returns empty data in column

## Order By

Default is ascending

`SELECT * FROM person ORDER BY country_of_birth;`

Can also do

`SELECT * FROM person ORDER BY country_of_birth ASC;`

Descending

`SELECT * FROM person ORDER BY country_of_birth DESC;`

Combining

`SELECT * FROM person ORDER BY id, email;`

## DISTINCT

Show only distinct records

`SELECT DISTINCT country_of_birth FROM person ORDER BY country_of_birth;`

## WHERE

Filter data based on conditions

`SELECT * FROM person WHERE gender='Female';`

Multiple conditions

`SELECT * FROM person WHERE gender='Male' AND country_of_birth='Poland';`

## OR

`SELECT * FROM person WHERE gender='Male' AND (country_of_birth='Poland' OR country_of_birth='China');`

`SELECT * FROM person WHERE gender='Male' AND (country_of_birth='Poland' OR country_of_birth='China') AND last_name='Antal';`

## Operators

Used for math or comparison

`SELECT 1 = 1;`
returns `t`
`SELECT 1 = 2;`
returns `f`

Not equal
`SELECT 2 <> 2;`
returns `f`

`SELECT 2 <> 1;`
returns `t`

`SELECT 'z' <> 'Z';`
returns `t`

`SELECT '2' <> '2';`
returns `f`

## LIMIT

`SELECT * from person LIMIT 10;`

## OFFSET

`SELECT * from person LIMIT 5;`
returns rows 5 through 10

## FETCH (O.G to SQL)

`SELECT * from person OFFSET 5 FETCH FIRST 5 ROW ONLY;`

`SELECT * from person OFFSET 5 FETCH FIRST ROW ONLY;`
return 1 row

## IN

`SELECT * FROM person WHERE country_of_birth='Brazil' OR country_of_birth='France' OR country_of_birth='China';`

But the shorter syntax uses `IN`

`SELECT * FROM person WHERE country_of_birth IN ('Brazil', 'China', 'France')`

## Between

Select data from range

`SELECT * FROM person WHERE date_of_birth BETWEEN DATE '2000-01-01' AND '2020-01-01';`

# Like

`SELECT * FROM person WHERE email LIKE '%.com';`

returns emails ending in `.com`

`SELECT * FROM person WHERE email LIKE '%google.%';`

`%` is the wildcard

`SELECT * FROM person WHERE email LIKE '________@%';`

`_` represents a character

`SELECT * FROM person WHERE country_of_birth LIKE 'P%';`
return countries

`SELECT * FROM person WHERE country_of_birth LIKE 'p%';`
returns no rows

## GROUP BY

`SELECT country_of_birth, COUNT(*) FROM person GROUP BY country_of_birth;`

`COUNT` is a SQL func and takes an arg `*` meaning all

## HAVING

Works with `GROUP BY` and allows you to perform extra filtering after the agregation. `HAVING` must follow immediately after `GROUP BY`

`HAVING` takes a function and an argument followed by a condition

`SELECT country_of_birth, COUNT(*) FROM person GROUP BY country_of_birth HAVING COUNT(*) > 5 ORDER BY country_of_birth;`

## Aggregate Functions

## MAX

`SELECT MAX(price) from car;`

## MIN

`SELECT MIN(price) from car;`

## AVG

`SELECT AVG(price) from car;`

## ROUND

`SELECT ROUND(AVG(price)) from car;`

`SELECT make, MAX(price) FROM car GROUP BY make;`

## SUM

`SELECT SUM(price) FROM car;`

## ARITHMETIC

`SELECT 10 * 2 - 10;`
returns 10

`SELECT 10 % 3;`
returns 1

providing additional data

`SELECT id, make, model, price, ROUND(price * .10, 2), ROUND(price - (price * .10), 2) FROM car;`

By default SQL will use `?column?` or a function name for extra columns. You can use aliases with `AS`

## AS

You can even alias existing columns

`SELECT id, make, model, price, ROUND(price * .10, 2), ROUND(price - (price * .10), 2) FROM car;`

## COALESCE

`SELECT COALESCE(email, 'Email not provided') FROM person;`

provides a default value of 'Email not provided'

Handle division by zero

`SELECT COALESCE(10 / NULLIF(0,0), 0);`

## NOW

Time stamp

`SELECT NOW();`

Cast to date:

`SELECT NOW()::DATE;`

Cast to time:

`SELECT NOW()::TIME;`

## Adding and Subtracting with Dates

## INTERVAL

Can also use the plural version

`SELECT NOW() - INTERVAL '10 YEAR';`
`SELECT NOW() - INTERVAL '10 MONTH';`
`SELECT NOW() - INTERVAL '10 DAY';`

Extract a certain peice of a date:

`SELECT NOW()::DATE;` <- Date
`SELECT NOW()::TIME;` <- Time

## EXTRACT

`SELECT EXTRACT (YEAR FROM NOW());` -> 2020
`SELECT EXTRACT (MONTH FROM NOW());` -> 5
`SELECT EXTRACT (DAY FROM NOW());` -> 26
`SELECT EXTRACT (CENTURY FROM NOW());` -> 21

## AGE

`SELECT first_name, last_name, gender, country_of_birth, date_of_birth, AGE(NOW(), date_of_birth) AS age FROM person;`

Let's combine!

`SELECT first_name, last_name, gender, country_of_birth, date_of_birth, AGE(NOW(), date_of_birth) AS age FROM person;`
returns `51 years 4 mons 41 days 29:30:29.227276`

Let's just get the average years

`SELECT first_name, last_name, gender, country_of_birth, date_of_birth, AGE(NOW(), date_of_birth) AS age FROM person;`

## Primary Keys

Uniquely identifies a record in a table.

## ALTER

Drop
`ALTER TABLE person DROP CONSTRAINT person_pkey;`

Add
`ALTER TABLE person ADD PRIMARY KEY (id);`

If you have a duplicate entry where you are setting the primary key, this won't work

You will have to delete the entries, add them with separate ids, then add the primary key contraint

## UNIQUE

Allows to have assert unique values in a column

`ALTER TABLE person ADD CONSTRAINT unique_email_address UNIQUE (email);`

If you have a duplicate, this doesn't work.

`ERROR: could not create unique index "unique_email_address"`
`DETAIL: Key (email)=(mmckea3@360.cn) is duplicated.`

If you try add someone with the same email, you will get an error:

`ERROR: duplicate key value violates unique constraint "unique_email_address"`
`DETAIL: Key (email)=(mmckea3@360.cn) already exists.`

Another way to add a contraint:

`ALTER TABLE person ADD UNIQUE(email);`

Here, you let postgres name it for you.

# CHECK CONSTRAINT

Add a contrainst based on a condition

`ALTER TABLE person ADD CONSTRAINT gender_constraint CHECK(gender = 'Female' OR gender = 'Male');`

# DELETE

Typically you want to delete by primary key

BE CAREFUL

You can delete all your rows of data very easily.

`DELETE FROM person;` <- Deletes Everything!

This is safer

`DELETE FROM person WHERE id='1005';`

Extend with `AND`

`DELETE FROM person WHERE gender = 'Female' AND country_of_birth = 'Nigeria';`

# UPDATE

use `SET` to pass in array of columns values and new values

`UPDATE person SET email = 'barrie@gmail.com' WHERE id='2005';`

Multiple columns and values

`UPDATE person SET first_name = 'Barry', email = 'barry@gmail.com' WHERE id='2005';`

Make sure you have a `WHERE` clause otherwise you may update the entire table

# ON CONFLICT DO NOTHING

`INSERT INTO person (id, first_name, last_name, email, gender, date_of_birth country_of_birth) VALUES(2008, 'Minnie', 'McKea', 'mmckea3@360.cn', 'Female' '1974-12-31', 'Russia') test-# ON CONFLICT (id) DO NOTHING;`

returns `INSERT 0 0`

This only works if there is a unique contraint or PK

`INSERT INTO person (id, first_name, last_name, email, gender, date_of_birth country_of_birth) VALUES(2008, 'Minnie', 'McKea', 'mmckea3@360.cn', 'Female' '1974-12-31', 'Russia') test-# ON CONFLICT (gender) DO NOTHING;`

returns `there is no unique or exclusion constraint matching the ON CONFLICT specification`

# UPSERT (EXCLUDED)

Example:

You have a user registering on your web site. They make a request to add their user details to your api. The user submits their email, but changes there mind and submits with a different email.

`INSERT INTO person (id, first_name, last_name, email, gender, date_of_birth, country_of_birth) VALUES(2008, 'Minnie', 'McKea', 'mmckea3@360.cn.uk', 'Female', '1974-12-31', 'Russia') ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;`

Email will be updated here, despite the conflict with the id

You can upsert many values on conflict like so:

`INSERT INTO person (id, first_name, last_name, email, gender, date_of_birth, country_of_birth) VALUES(2008, 'Minny', 'McKeay', 'mmckeay3@360.cn.uk', 'Female', '1974-12-31', 'Russia') ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, last_name = EXCLUDED last_name, first_name = EXCLUDED.first_name;`

## FOREIGN Keys, Joins, and Relationships

We want a query to return a combination of person and car (in relation).

We want to represent:

- A person has one car
- A car belongs to one person

To acheive this, we can have a relationship.

`person.car_id` (FK) -> `car.id` (PK) (type needs to be the same)

`car_id BIGINT REFERENCES card(id) UNIQUE (car_id)`

Add a foreign key to person. We are making it a big in here because `BIGSERIAL` is managed by a sequence. Otherwise, `BIGSERIAL` and `BIGINT` are the same.

`car_id BIGINT REFERENCES car (id)`

The car table must be created first because the person table references it. It would break otherwise.

You can add car ids to a person like so:

`UPDATE person SET car_id = 1 WHERE id = 2;`

If you try to add a car id that doesn't exist, you will get an error:

`UPDATE person SET car_id = 3 WHERE id = 3;`

`ERROR: insert or update on table "person" violates foreign key constraint "person_car_id_fkey"`
`DETAIL: Key (car_id)=(3) is not present in table "car".`

You can only assign a foriegn key when there is a relation that exists in the other table

## INNER JOIN

An inner join is a way to combine two tables. The inner join takes whatever is common in both tables (PK and FK).

Table A + Table B = Table C

`JOIN` takes a table

`ON` (takes a column from the table you specify)

`SELECT * FROM person JOIN car ON person.car_id = car.id;`

In this example, we have one person without a car. Therfore, they are not shown in the join table. This is because we join based on the condition

We can specify which columns we want to show in the join table from both tables:

`SELECT person.first_name, car.make, car.model, car.price FROM person JOIN car ON person.car_id = car.id;`

## LEFT JOIN

Allows to combine too tables, like inner join. The difference is a left join includes all the rows from table a as well as the records from table b that have a cooresponding relationship and also the records that don't have a corresponding relationship (i.e all records even it there isn't a match).

`SELECT * FROM person LEFT JOIN car ON person.car_id = car.id;`

returns all 3 people, including Billy Bob who doesn't have a car (no FK relation between car and person)

You can tack on a `WHERE` clause at the end to futher filter your results

`SELECT * FROM person LEFT JOIN car ON person.car_id = car.id WHERE car.* IS NULL;`
returns the joined tables, but only with the person without a car

## Deleting Records with Foreign Keys

If we delete a car that has a relationship to a person, we get an error:

`ERROR: update or delete on table "car" violates foreign key constraint "person_car_id_fkey" on table "person"`
`DETAIL: Key (id)=(3) is still referenced from table "person".`

`CASCADE` is bad practice. You always want full control of your data. Instead you want to first set the person's car id to `NULL` and then delete the car:

`UPDATE person SET car_id = NULL WHERE id = 4;`

And then:

`DELETE FROM car WHERE id = 3;`

## EXPORT DATA TO CSV FILE

`\copy (SELECT * FROM person LEFT JOIN car ON (car.id = person.car_id)) TO '{filePathAndName}' WITH DELIMITER ',' CSV HEADER`

## BIG SERIAL DATA TYPE

You can select the `BIGINT` type from `BIGSERIAL`

`SELECT * FROM person_id_seq;`

If you run `\d person` you will see `nextval('person_id_req'::reqclass)

You can invoke this function like so:

`SELECT nextval('person_id_seq'::regclass);`

If query the `person_id_seq` table again, we will see that the `last_value` record is now incremented one higher.

The next person we add will have that higher value as it's id.

To restart the sequence, we can alter it:

`ALTER SEQUENCE person_id_seq RESTART WITH 9;`

## Extensions

Postgres is designed to be easily extended. Extensions are functions that can add extra functionality to your database

To view available extensions, run:

`SELECT * FROM pg_available_extensions;`

## UUID (Universally Unique Indentifier)

Collisions are extremely unlikely (almost impossible)

To use `UUID`, you need to install the extension.

`IF NOT EXISTS` ensures that it only takes effect if the extension doesn't already exist.

`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
returns `CREATE EXTENSION`

If we view the list of available extensions again, you will see the installed version column populated.

Once the extension is installed, you can see a list of available functions with `\df`.

To run a function, run `SELECT` and the invoked function name. For example:

`SELECT uuid_generate_v4();`

One benefit of `UUID` as PKs is that it makes are data safer. It makes it harder for attackers to mine or database. For example, with an url of `users/1000`, the attacker can exploit all of the users from 1-100.
