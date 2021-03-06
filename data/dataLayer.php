<?php
function connectionToDataBase(){
		
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "AccessControl";
		$conn = new mysqli($servername, $username, $password, $dbname);
		
		if ($conn->connect_error){
			return null;
		}
		else{
			return $conn;
		}
}
function attemptRegistration($fName, $lName, $mat, $userPassword){
    
    $conn = connectionToDataBase();
    if ($conn != null){
    
    $sql = "INSERT INTO Admin (fName,lName, matricula, passwrd) 
            VALUES ('$fName','$lName','$mat','$userPassword')";
    
    // Run query and store resulting data
    $result = $conn->query($sql);
        
        if ($result == TRUE) {
            return array("status" => "SUCCESS");   
             $conn -> close();
        } 
            
            
        else{
            return array ("status" => "Something went wrong");
            $conn -> close();
        }
            
    }
        else {
            $conn -> close();
            header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
     }
        
}


function attemptRegisterEmployee($fName, $lName, $mat, $position){
    
    $conn = connectionToDataBase();
    if ($conn != null){
    
        $sql = "INSERT INTO Employee (fName,lName, matricula, position) 
                VALUES ('$fName','$lName','$mat','$position')";
        
        

        // Run query and store resulting data
        $result = $conn->query($sql);

            if ($result == TRUE) {
                $conn -> close();
                return array("status" => "SUCCESS");   
            } 


            else{
                $conn -> close();
                return array ("status" => "Something went wrong");
            }

    }
        else {
            $conn -> close();
            header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
     }
        
}


function attemptRemoveRegister ($mat){ //pendiente de agregar esta función
    $conn = connectionToDataBase();
		if ($conn != null){
			
            $sql = "DELETE FROM Registers WHERE mat='$mat'";;
		
			$result = $conn->query($sql);
			
           if ($result != null) 
			{
                return array( "status" => "SUCCESS");
			}
			
            else{
				return array("status" => "This registers cannot be deleted");
			}
		}else{
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}    
}


function attemptRemoveEmployee ($mat){
    $conn = connectionToDataBase();
		if ($conn != null){
			
            $sql = "DELETE FROM Employee WHERE matricula='$mat'";
		
			$result = $conn->query($sql);
            
            if ($result != null)
			{
                return array( "status" => "SUCCESS");
			}
			
            else{

				return array("status" => "This employee doesn't exist");
			}
		}else{
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}    
}




function attemptRemoveAdmin($mat){
    
$conn = connectionToDataBase();

    if ($conn != null){

        $sql = "DELETE FROM Admin WHERE matricula='$mat'";
        
        $result = $conn->query($sql);

            if ($result != null)	
            {  
                return array( "status" => "SUCCESS"); 
            }

            else{
                return array("status" => "This administrator doesn't exist");
            }
    }

    else{
        $conn -> close();
        return array("status" => "CONNECTION WITH DB WENT WRONG");
    }    

}


function loadAdministrators(){

$conn = connectionToDataBase();
    if ($conn != null){
    
    $sql = "SELECT * FROM Admin";
    
    // Run query and store resulting data
    $result = $conn -> query($sql); 
           
        if ($result->num_rows > 0)
        {    
            $response = array();    
            
            while($row = $result -> fetch_assoc()) {
                array_push($response, array("mat" => $row["matricula"], "fName" =>$row["fName"], "lName" => $row["lName"])); 
            }
            return ($response);
        }
        
        else{
             header("No administrators registered");
        }
            
    }
        else {
            $conn -> close();
            header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
     }
}


function loadAllEmployees(){

$conn = connectionToDataBase();
    if ($conn != null){
    
    $sql = "SELECT * FROM Employee";
    
    // Run query and store resulting data
    $result = $conn -> query($sql); 
           
        if ($result->num_rows > 0)
        {    
            $response = array();    
            
            while($row = $result -> fetch_assoc()) {
                array_push($response, array("status"=>"SUCCESS", "position" => $row["position"], "mat" =>$row["matricula"],                                "fName" =>$row["fName"], "lName" => $row["lName"])); 
            }
            return ($response);
        }
        
        else{
             header("No administrators registered");
        }
            
        }
        else {
            $conn -> close();
           // header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
            return array("status" => "No employees registered");
        }
}


function attemptLogin($mat){
		$conn = connectionToDataBase();
		if ($conn != null){
			
            $sql = "SELECT fName, lName, matricula, passwrd FROM Admin WHERE matricula = '$mat'";
		
			$result = $conn->query($sql);
			
            if ($result->num_rows > 0)
			{
                $row = $result -> fetch_assoc();
				$conn -> close();
			
                return array("firstName" => $row["fName"], "lastName" => $row["lName"], "mat" => $row["matricula"],
                             "password" => $row["passwrd"], "status" => "SUCCESS");
			}
			else{
				$conn -> close();
				return array("status" => "USERNAME NOT FOUND");
			}
		}else{
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}
}



function attemptCreateSession($mat, $userPassword){
    
    $conn = connectionToDataBase();
    if ($conn != null)  { 
        $sql = "SELECT fName, lName, matricula FROM Admin WHERE matricula = '$mat' AND passwrd ='$userPassword'";
      
        $result = $conn -> query($sql);
        
        if ($result->num_rows > 0)
        {
            $row = $result -> fetch_assoc();
            $conn -> close();
            
                // Starting the session
		    	session_start();
                session_destroy();
                session_start();
                
		    	$_SESSION["fName"] = $row["fName"];
		    	$_SESSION["lName"] = $row["lName"];
                $_SESSION["matricula"] = $mat;
                $_SESSION["password"] = $userPassword;		    	      
         }
        
        
        else 
        {   $conn -> close();
            header('HTTP/1.1 406 User not found');
            die("Wrong credentials provided!");
            
        }
    
    }
    
    else{
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}
}

function searchEmployee($mat){
    
    $conn = connectionToDataBase();

    if ($conn != null){
			
        $sql = "SELECT fName, lName, matricula FROM Employee WHERE matricula = '$mat'";

        $result = $conn->query($sql);

        if ($result->num_rows > 0)
        {
            $row = $result -> fetch_assoc();
            $conn -> close();

            return array("firstName" => $row["fName"], "lastName" => $row["lName"], "mat" => $row["matricula"],
                          "status" => "SUCCESS");
        }
        else
        {
            $conn -> close();
            return array("status" => "employee doesn't exist");
        }
    }
    
    else{
        $conn -> close();
		return array("status" => "CONNECTION WITH DB WENT WRONG");
	}
    
}



function searchAdmin($mat){
    
    $conn = connectionToDataBase();

    if ($conn != null){
			
        $sql = "SELECT fName, lName, matricula FROM Admin WHERE matricula = '$mat'";

        $result = $conn->query($sql);

        if ($result->num_rows > 0)
        {
            $row = $result -> fetch_assoc();
            $conn -> close();

            return array("firstName" => $row["fName"], "lastName" => $row["lName"], "mat" => $row["matricula"],
                          "status" => "SUCCESS");
        }
        else
        {
            $conn -> close();
            return array("status" => "Administrator doesn't exist");
        }
    }
    
    else{
        $conn -> close();
		return array("status" => "CONNECTION WITH DB WENT WRONG");
	}
    
}



?>