INSERT INTO customer (first_name, last_name, email, funky_id, created_on, updated_on)
SELECT first_name, last_name, email, funky_id, current_timestamp, current_timestamp
FROM (
  VALUES
    ('Clark','Kent','superman@jl.com','superman'),
    ('Bruce','Wayne','batmam@jl.com','batman'),
    ('Diana','Prince','ww@jl.com','wonder_woman'),
    ('Barry','Allen','flash@jl.com','flash'),
    ('Hal','Jordan','gl@jl.com','green_lantern'),
    ('Arthur','Curry','aquaman@jl.com','aquaman')
) AS data(first_name, last_name, email, funky_id)
WHERE NOT EXISTS (SELECT first_name, last_name, email, funky_id FROM customer WHERE data = customer);
