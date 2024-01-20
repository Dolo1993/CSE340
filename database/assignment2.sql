--Inserting user details
INSERT INTO account (account_firstname, account_lastname, account_email, account_password) 
VALUES ('Tony', 'Stark', ' tony@starkent.com', 'Iam1ronM@n');  

-- Updating user details 
UPDATE account 
SET account_type = 'Admin' 
WHERE account_firstname ='Tony' AND account_lastname = 'Stark'; 

--Deleting user details 
DELETE FROM account 
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Updating string in the "GM Hummer record" from the inventory table
UPDATE 
   inventory 
SET 
   inv_description = REPLACE( 
	   inv_description, 'small interiors', 'a huge interior'
   )
WHERE 
   inv_make = 'GM' AND inv_model = 'Hummer';    

-- Using INNER JOIN to compare record from both inventoy and classification table  
SELECT inventory.inv_make, inventory.inv_model, classification.classification_name
FROM inventory
INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification.classification_name = 'Sport';  

--Adding /vehicles in the middle of the file path in the inv_image and inv_thumbnail columns
UPDATE inventory
SET 
    inv_image = CONCAT(SUBSTRING(inv_image FROM 1 FOR POSITION('/images/' IN inv_image) + 7), 'vehicles', SUBSTRING(inv_image FROM POSITION('/images/' IN inv_image) + 7)),
    inv_thumbnail = CONCAT(SUBSTRING(inv_thumbnail FROM 1 FOR POSITION('/images/' IN inv_thumbnail) + 7), 'vehicles', SUBSTRING(inv_thumbnail FROM POSITION('/images/' IN inv_thumbnail) + 7));


