$(document).ready(function () {
    
    $("#LoginSec").show();
    $("#RemoveSec").hide();
    $("#menutoolbar").hide();
    $("#DashboardArrives").hide();
    $("#RegSec").hide();
    $("#loginButton").show();
    $("#logoutButton").hide();
    $("#PageTitle").hide();
    $("#DivRemoveEmployee").hide();
    $("#DivRemoveAdmin").hide();
    
    
   
    $("#RegSection").on("click", function () {
        $("#LoginSec").hide();
        $("#RemoveSec").hide();
        $("#DashboardArrives").hide();
        $("#RegSec").show();
    }); 
    
    $("#RmvSection").on("click", function () {
        $("#LoginSec").hide();
        $("#RemoveSec").show();
        $("#DashboardArrives").hide();
        $("#RegSec").hide();
    });
    
    $("#SearchEmployee").on("click", function () {
        $("#LoginSec").hide();
        $("#RemoveSec").hide();
        $("#DashboardArrives").show();
        $("#RegSec").hide();
    });
    
/////////////////////////////////
///////Verify Session ///////////
/////////////////////////////////

    $.ajax({
        url: 'data/applicationLayer.php',
        type: 'POST' ,
        data: { "action": "verifySession"},
        dataType: 'json',
        success: function(jsonResponse){
          if(jsonResponse.state === "true"){
            $("#currentLogin").empty();
            $("#currentLogin").append("Welcome,");
            $("#currentLogin").append(jsonResponse.mat);
            $("#currentLogin").show();
            $("#loginButton").hide();
            $("#logoutButton").show();
            $("#menutoolbar").show();
            $("#LoginSec").hide();
            $("#DashboardArrives").show();
            
          }
          else{
            $("#currentLogin").hide();
            $("#loginButton").show();
            $("#logoutButton").hide();
            
          }
        },
        error: function(errorMessage){
          alert(errorMessage.responseText);
          alert("False verify");
          $("#currentLogin").hide();
        }
    });    
    

    
/////////////////////////////////////////////////////
///////////////// REGISTER ADMIN ////////////////// 
/////////////////////////////////////////////////////

    $("#registerBtn").click(function () {
       
        var jsonData = {
            "fName": $("#inFname").val(), 
            "lName": $("#inLname").val(), 
            "password": $("#inPassword").val(), 
            "mat": $("#inMatricula").val(), 
            "action": "register"
            
        };
        
        $.ajax({
            url: "data/applicationLayer.php"
            , type: "POST"
            , data: jsonData
            , success: function (jsonResponse) {
                alert(jsonResponse.message+ "!");
                $("#RegSec").hide(); 
                $("#LoginSec").show(); 
                
                
            }
            , error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
        
    });
/////////////////////////////////////////////////////////////
    
    
/////////////////////////////////////////////////////
///////////////// DELETE EMPLOYEE ////////////////// 
/////////////////////////////////////////////////////
    
 $("#BtnRmvEmployee").click(function(){
                               
        $("#DivRemoveEmployee").show();
        $("#DivRemoveAdmin").hide();    
        
        $("#remove1").click(function(){
            
            var jsonData = {
            
            "mat": $("#RemoveEmployee").val(), 
            "action": "removeEmployee"
            
            };

            $.ajax({
                url: "data/applicationLayer.php"
                , type: "POST"
                , data: jsonData
                , success: function (jsonResponse) {
                    alert(jsonResponse.message+ "!");

                    $("#DashboardArrives").show(); 
                    $("#RemoveEmployee").val("");


                }
                , error: function (errorMessage) {
                    alert(errorMessage.responseText);
                }
            });     
            
        });
                               
    });
    
//////////////////////////////////////////////////

/////////////////////////////////////////////////////
///////////////// DELETE ADMIN ////////////////// 
/////////////////////////////////////////////////////
    
    $("#BtnRmvAdmin").click(function(){
                               
        $("#DivRemoveAdmin").show();                   
        $("#DivRemoveEmployee").hide();
                               
    });
    
//////////////////////////////////////////////////
    
    
/////////////////////////////////////////////////////
///////////////// REGISTER EMPLOYEE ////////////////// 
/////////////////////////////////////////////////////

    $("#registerBtn2").click(function () {
       
        var jsonData = {
            "fName": $("#inFname2").val(), 
            "lName": $("#inLname2").val(), 
            "mat": $("#inMatricula2").val(), 
            "position": $("#inPosition").val(), 
            "action": "registerEmp"
            
        };
        
        $.ajax({
            url: "data/applicationLayer.php"
            , type: "POST"
            , data: jsonData
            , success: function (jsonResponse) {
                alert(jsonResponse.message + "!");
                $("#RegSec").hide(); 
                $("#LoginSec").show(); 
                
                
            }
            , error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
        
    });
/////////////////////////////////////////////////////////////
        
    
/////////////////////////////////////////////////
///////////////LOGIN SECTION ////////////////////
/////////////////////////////////////////////////

$("#loginButton").click(function () { //Session begins       
    var jsonData = {
        "action": "login",
        "matricula": $("#loginMat").val(), 
        "password": $("#loginPsswrd").val()
    };
       
    $.ajax({
        url: "data/applicationLayer.php", 
        type: "POST", 
        data: jsonData, 
        dataType: "json", 
        contentType: "application/x-www-form-urlencoded", 
        success: function (jsonResponse) {
                
            alert("Welcome back " + jsonResponse.fName + "" + jsonResponse.lName);
            var newHTMLContent = "";
                
            newHTMLContent = jsonResponse.mat;
            $("#currentLogin").append(newHTMLContent); //currently login as
            $("#currentLogin").show();
            $("#loginButton").hide();
            $("#logoutButton").show();
            $("#PageTitle").show();
            $("#menutoolbar").show();
                
                var jsonData2 = {
                    "CookieValue": jsonResponse.mat, 
                    "CookieName": "matID", 
                    "action": "createCookie"
                };

                var valueBox = $("#logRemember").is(":checked");
                
                if (valueBox) {
                    console.log(valueBox);
                    $.ajax({
                        //url: "php/CreateCookie.php"
                        url: "data/applicationLayer.php"
                        , type: "POST"
                        , data: jsonData2
                        , success: function (jsonResponse) {
                            console.log(jsonResponse);
                        }
                        , error: function (errorMessage) {
                            alert(errorMessage.responseText);
                        }
                    });
                }      
            }
            , error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
        

    
    });

    
//////////////////////////////////////////////    
/////////// GET USERNAME WITH COOKIE///////////
///////////////////////////////////////////////
    
    $.ajax({ //Gets user name in LoginForm
       // url: "php/CookieService.php"
        url: "data/applicationLayer.php"
        , type: "POST"
        , data:{
          "action": "retrieveCookie"
        }
        , success: function (jsonResponse) {
            $("#loginMat").val(jsonResponse.cookieMat);
        }
        , error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
///////////////////////////////////////////////////   
///////////////////////////////////////////////////   
    

///////////////////////////////////////////////////
////////////// DELETE SESSION /////////////////////
///////////////////////////////////////////////////

$("#logoutButton").on("click", function () {

        $.ajax({
            url: "data/applicationLayer.php"
            , type: "POST"
            , dataType: "json"
            ,data:{
                action: "deleteSession"
            }
            , success: function (jsonResponse) {
                alert(jsonResponse.success);
                window.location.replace("index.html");
                $("#Login").show();
                $("#logoutButton").hide();
                $("#currentLogin").hide();
            }
            , error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    });
///////////////////////////////////////////////////    
///////////////////////////////////////////////////    
    
    
    
});