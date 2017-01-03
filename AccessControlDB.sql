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


INSERT INTO Employee( fName, lName , matricula, position)
VALUES ('Eva', 'Villarreal' , '1195725', 'intern' )

INSERT INTO Employee( fName, lName , matricula, position)
VALUES ('Eva', 'Villarreal' , '12', 'intern' )

INSERT INTO Registers(mat, arrival, depart, dateReg)
values ('12', '13:00:15', '13:30:15' , '2010-01-02' )

INSERT INTO Admin( fName, lName , matricula, passwrd )
VALUES ('Gerardo', 'Pinzon' , '4545', '123' )

