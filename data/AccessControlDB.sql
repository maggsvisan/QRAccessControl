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
); 


INSERT INTO Employee( fName, lName , matricula, position)
VALUES ('Eva', 'Villarreal' , '1195725', 'intern' )

INSERT INTO Registers(mat, arrival, depart, dateReg)
values ('1195', '13:00:15', '13:30:15' , '2010-01-02' )


INSERT INTO Admin( fName, lName , matricula, passwrd )
VALUES ('Maggie', 'Villarreal' , '12345', '5PzP/Krq1uEMS/6gamY/tIJ7zps+0mPVJCYlKB6+szg=')

