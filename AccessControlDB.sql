CREATE TABLE Employee (
    fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    matricula VARCHAR(50) NOT NULL PRIMARY KEY,
    position VARCHAR(50) NOT NULL
);


CREATE TABLE Admin (
   fName VARCHAR(30) NOT NULL,
   lName VARCHAR(30) NOT NULL,
   matricula VARCHAR(50) NOT NULL PRIMARY KEY,
   passwrd VARCHAR(50) NOT NULL
   
); 

CREATE TABLE Registers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    mat VARCHAR(50) NOT NULL, 
    arrival TIME NOT NULL, 
    depart TIME NOT NULL, 
    dateReg DATE NOT NULL,
    
    FOREIGN KEY (mat) REFERENCES Employee(matricula)
); 

