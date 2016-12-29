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
    $("#CurrentAccountsSec").hide();
    $("#RegAdmin").hide();
    $("#RegEmp").hide();
    
   
    $("#RegSection").on("click", function () {
        $("#LoginSec").hide();
        $("#RemoveSec").hide();
        $("#DashboardArrives").hide();
        $("#RegSec").show();
        $("#CurrentAccountsSec").hide();
    }); 
    
    $("#CurrentAccounts").on("click", function () {
        $("#LoginSec").hide();
        $("#RemoveSec").hide();
        $("#DashboardArrives").hide();
        $("#RegSec").hide();
        $("#CurrentAccountsSec").show();
    }); 
    
    
    $("#RmvSection").on("click", function () {
        $("#LoginSec").hide();
        $("#RemoveSec").show();
        $("#DashboardArrives").hide();
        $("#RegSec").hide();
        $("#CurrentAccountsSec").hide();
    });
    
    $("#SearchEmployee").on("click", function () {
        $("#LoginSec").hide();
        $("#RemoveSec").hide();
        $("#DashboardArrives").show();
        $("#RegSec").hide();
        $("#CurrentAccountsSec").hide();
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
            $("#currentLogin").append("Login as: ");
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
$("#BtnAddAdmin").click(function() {
    
    $("#RegAdmin").show();
    $("#RegEmp").hide();
        
    $("#registerBtn").click(function () {
       
        if ($("#inFname").val()==("") || $("#inLname").val()==("") || $("#inMatricula").val()== ("") ||   $("#inPassword").val() == (""))
        {
            alert("Fill all the blanks, please");
            $("#inFname").val("");
            $("#inLname").val("");
            $("#inPassword").val("");
            $("#inMatricula").val("");
            
        }
        
        
        else{
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
                , dataType: 'json'
                , success: function (jsonResponse) {
                    alert(jsonResponse.message+ "!");
                    $("#RegSec").hide(); 
                    $("#LoginSec").show(); 


                }
                , error: function (errorMessage) {
                    alert(errorMessage.responseText);
                }
            });
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
                , dataType: 'json'
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
    
//validate ADMIN ksdhbfkshdbfjhsf
$("#validate2").click(function(){
        
        var jsonData = {
            "mat": $("#RemoveAdmin").val(), 
            "action": "validateAdmin"
        };  
            console.log(jsonData);    
           $.ajax({
               url: "data/applicationLayer.php", 
               type: "POST", 
               data: jsonData, 
               dataType: 'json',
               success: function (jsonResponse) {     
                    alert(jsonResponse.status+ "!"); 
                    console.log(jsonResponse)
                }, 
               error: function (errorMessage) {
                   alert(errorMessage.responseText);
                }
            });    
        
        
        
    });

//////////////////////////////////////////////////

/////////////////////////////////////////////////////
///////////////// DELETE ADMIN ////////////////// 
/////////////////////////////////////////////////////
    $("#BtnRmvAdmin").click(function(){
                               
        $("#DivRemoveAdmin").show();                   
        $("#DivRemoveEmployee").hide();
        
            $("#remove2").click(function(){

              /*  var jsonData = {  //VALIDATE ADMIN PENDIENTE

                "mat": $("#RemoveAdmin").val(), 
                "action": "validateAdmin"

                };
                
                alert("ajax!");
                
                $.ajax({
                    url: "data/applicationLayer.php"
                    , type: "POST"
                    , data: jsonData
                    , success: function (jsonResponse) {
                        alert(jsonResponse.message+ "!");
                    }
                    , error: function (errorMessage) {
                       alert(errorMessage.responseText);
                       //alert("error! D:");
                    }
                });    
                */
                
                var jsonData2 = {
                        "mat": $("#RemoveAdmin").val(), 
                        "action": "removeAdmin"

                        };

                        $.ajax({
                            url: "data/applicationLayer.php"
                            , type: "POST"
                            , data: jsonData2
                            , success: function (jsonResponse2) {
                                alert(jsonResponse2.message+ "!");

                                $("#DashboardArrives").show(); 
                                $("#RemoveAdmin").val("");
                                $("#RemoveSec").hide();


                            }
                            , error: function (errorMessage) {
                                alert(errorMessage.responseText);
                            }
                        }); 
            });
});
    
//////////////////////////////////////////////////
    
    
/////////////////////////////////////////////////////
///////////////// REGISTER EMPLOYEE ////////////////// 
/////////////////////////////////////////////////////

  $("#BtnAddEmployee").click(function (){
      
    $("#RegAdmin").hide();
    $("#RegEmp").show();

    $("#registerBtn2").click(function () {
       
        
        if ($("#inFname2").val()==("") || $("#inLname2").val()==("") || $("#inMatricula2").val()== ("") ||   $("#inPosition").val() == (""))
        {
            alert("Fill all the blanks, please");
            $("#inFname2").val("");
            $("#inLname2").val("");
            $("#inMatricula2").val("");
            $("#inPosition").val("");
            
        }
        
        
        else {
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
        }
        
    });
      
  });
/////////////////////////////////////////////////////////////
        
    
/////////////////////////////////////////////////
///////////////LOAD ADMINS //////////////////////
/////////////////////////////////////////////////

    $("#AdminList").click(function(){
        
        var jsonData = {
            "action": "loadAdmins"
            
        };
        
        $.ajax({
            url: "data/applicationLayer.php"
            , type: "POST"
            , data: jsonData
            , success: function (jsonResponse) {
                
                var postUser = "";
                 if (jsonResponse.length > 0){
                        $.each(jsonResponse,function(index){
                            postUser += "<li>" + jsonResponse[index].mat 
                                        +": " +jsonResponse[index].fName 
                                        + " " + jsonResponse[index].lName +
                                        "</li>" + "<br>";   
                        });
                 } 
                               
                $("#registeredAdmins").empty();
                $("#registeredAdmins").append(postUser);
                
                
            }
            , error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
      
    });
    
/////////////////////////////////////////////////
    
    
////////////////////////////////////////////////////
///////////////LOAD EMPLOYEES //////////////////////
////////////////////////////////////////////////////

    $("#EmployeeList").click(function(){
        
        var jsonData = {
            "action": "loadEmployees"
            
        };
        
        $.ajax({
            url: "data/applicationLayer.php"
            , type: "POST"
            , data: jsonData
            , success: function (jsonResponse) {
                
                var postUser = "";
                 if (jsonResponse.length > 0){
                        $.each(jsonResponse,function(index){
                            postUser += "<li>" + jsonResponse[index].mat 
                                        +": " +jsonResponse[index].fName 
                                        + " " + jsonResponse[index].lName +
                                        "</li>" + "<br>";   
                        });
                 } 
                
                $("#registeredEmployees").empty();
                $("#registeredEmployees").append(postUser);
                
                
            }
            , error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
      
    });
    
/////////////////////////////////////////////////    
    
    
    
    
    
    
    
    
    
    

    
    
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