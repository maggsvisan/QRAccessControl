<?php
header('Content-type: application/json');
require_once __DIR__ . '/dataLayer.php';
$action = $_POST["action"];
switch ($action){
    
    case "login": loginFunction();
                    break;
    case "logout": logoutFunction();
                    break;
    case "register": registerfunction();
                    break;
    case "createCookie": createCookie();
                    break;
    case "retrieveCookie": retrieveCookie();
                    break;
    case "verifySession": verifySession();
                    break;
    case "deleteSession": deleteSession();
                    break; 
    case "registerEmp": registerEmployee();
                    break;
   //case "valideEmployee": validateEmployee();
     //               break;
    //case "valideAdmin": validateAdmin();
      //            break;
    
    case "loadEmployees": loadEmployees();
                    break;
    case "loadAdmins": loadAdmins();
                    break;
    case "removeEmployee": removeEmployee();
                    break;
    case "removeAdmin":removeAdmin();
                    break;
    /*case "loadAllEmployees": loadAllEmployees();
                    break;
    case "loadAllAdmin": loadAllAdmin();
                    break;      */
}

function registerFunction(){ //registers an admin 
    $fName = $_POST["fName"];
    $lName= $_POST["lName"];
    $passwrd = $_POST["password"];
    $mat= $_POST["mat"];
      
    $userPassword = encryptPassword();
        
    $result = attemptRegistration($fName, $lName, $mat, $userPassword);
    
    if ($result["status"] == "SUCCESS"){
		 $response = array("message"=> "Now you are register");
         echo json_encode($response); //sent it to presentation layer
    }	
    
    else{
        header('HTTP/1.1 500' . $result["status"]);
        die($result["status"]); //returns error from DataLayer
    }	       
}

function registerEmployee(){ //register employee
    
    $fName = $_POST["fName"];
    $lName= $_POST["lName"];
    $position = $_POST["position"];
    $mat= $_POST["mat"];
    
    $result= attemptRegisterEmployee($fName, $lName, $mat, $position);
    
    if ($result["status"] == "SUCCESS"){
		 $response = array("message"=> "New employee registered");
         echo json_encode($response); //sent it to presentation layer
    }	
    
    else{
        header('HTTP/1.1 500' . $result["status"]);
        die($result["status"]); //returns error from DataLayer
    }	       
       
}

function removeEmployee (){
    
    $mat= $_POST["mat"];
    
    $result= attemptRemoveRegister($mat);
    
    if ($result["status"] == "SUCCESS"){
		// $response = array("message"=> "Registers deleted");
        // echo json_encode($response); //sent it to presentation layer
        
         $result2= attemptRemoveEmployee($mat);
        
            if($result2["status"]=="SUCCESS"){
                $response2= array("message"=> "Employee deleted successfully");
                echo json_encode($response2);
            }
    }	
    
    else{
        header('HTTP/1.1 500' . $result["status"]);
        die($result["status"]); //returns error from DataLayer
    }	
    
}
/*
function validateAdmin(){
    
    $matricula= $_POST["mat"];
    
    debug_to_console( $matricula );

    $result= attemptValidateAdmin($matricula);

    echo json_encode($result["status"]);
    
}
*/

function removeAdmin(){
    
    $mat= $_POST["mat"];
    
    $result= attemptRemoveAdmin($mat);
    
    if ($result["status"] == "SUCCESS"){
		$response = array("message"=> "Administrator deleted");
        echo json_encode($response); //sent it to presentation layer
    }	
    
    else{
        header('HTTP/1.1 500' . $result["status"]);
        die($result["status"]); //returns error from DataLayer
    }	
    
}


function loadAdmins(){
    $result= loadAdministrators();
    echo json_encode($result);
}

function loadEmployees(){
    $result= loadAllEmployees();
    echo json_encode($result);
}


function createCookie(){
    
    $cookieName = $_POST["CookieName"];
	$cookieValue = $_POST["CookieValue"];
    
    
	setcookie($cookieName, $cookieValue, time() + (86400 * 20), "/"); // 86400 = 1 day
 
    if (isset($_COOKIE[$cookieName])) {
    echo json_encode("Cookie $cookieName created");
    } 
    
    else {
    echo json_encode("Can't create cookie");
  }
    
}
function retrieveCookie(){
    
    if (isset($_COOKIE['matID'])) //this checks if a cookie is set or not
	{
		echo json_encode(array('cookieMat' => $_COOKIE['matID'])); 
        
	}
	else
	{
		header('HTTP/1.1 406 Cookie not set yet.');
	    die("It is the first time you enter this application.");
	}
    
}
function loginFunction(){
	$mat = $_POST["matricula"];
	$userPassword = $_POST["password"];
	$result = attemptLogin($mat);
    
    
	if ($result["status"] == "SUCCESS"){
		
        $decryptedPassword = decryptPassword($result['password']);
        
        # Compare the decrypted password with the one provided by the user
    	if ($decryptedPassword === $userPassword)
		  {	  
            $newSession= attemptCreateSession($mat, $result['password']);
            echo json_encode(array("message" => "Login Successful", 
                                   "fName" => $result["firstName"] , 
                                    "lName" => $result["lastName"],
                                    "mat"=> $result["mat"],
                                   ));  
           }   
        
        else
			{
				header('HTTP/1.1 306 Wrong credentials');
				die("Wrong credentials");
			}
	}	
	else{
		header('HTTP/1.1 500' . $result["status"]);
		die($result["status"]);
	}	
}
function verifySession(){
    
    // Start session
    session_start();
    //verify if username is set in session
    if(empty($_SESSION['matricula'])) {
        $response = array("matricula"=>null, "password"=>null, "state"  =>"false");
        echo json_encode($response);
    }
    else {
    	$response = array("mat"=>$_SESSION['matricula'], "password"=> $_SESSION['password'], "state"  =>"true");        
    	echo json_encode($response);
    }
    
}
function deleteSession(){
    
	session_start();
	if (isset($_SESSION['fName']) && isset($_SESSION['lName']))
	{
		unset($_SESSION['fName']);
		unset($_SESSION['lName']);
		session_destroy();
		echo json_encode(array('success' => 'Session closed'));   	    
	}
	else
	{
		header('HTTP/1.1 406 Session has expired, you will be redirected to the login');
		die("Session has expired!");
	}
    
}
/////////////////////// Encryption and Decryption //////////////////////////////
#Action to decrypt the password of the user
	function decryptPassword($password)
	{
		$key = pack('H*', "bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
	    
	    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
    	
	    $ciphertext_dec = base64_decode($password);
	    $iv_dec = substr($ciphertext_dec, 0, $iv_size);
	    $ciphertext_dec = substr($ciphertext_dec, $iv_size);
	    $password = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
	   	
	   	
	   	$count = 0;
	   	$length = strlen($password);
	    for ($i = $length - 1; $i >= 0; $i --)
	    {
	    	if (ord($password{$i}) === 0)
	    	{
	    		$count ++;
	    	}
	    }
	    $password = substr($password, 0,  $length - $count); 
	    return $password;
	}
	# Action to encrypt the password of the user
	function encryptPassword()
	{
        $userPassword= $_POST["password"];
	    $key = pack('H*', "bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
	    $key_size =  strlen($key);
	    
	    $plaintext = $userPassword;
	    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
	    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
	    
	    $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $plaintext, MCRYPT_MODE_CBC, $iv);
	    $ciphertext = $iv . $ciphertext;
	    
	    $userPassword = base64_encode($ciphertext);
	    return $userPassword;
	}
///////////////////////////////////////////////////////////////////////////
?>