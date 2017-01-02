$(document).ready(function () {
    /* checkbox nuevo de remember */
    $('.button-checkbox').each(function () {
        var $widget = $(this)
            , $button = $widget.find('button')
            , $checkbox = $widget.find('input:checkbox')
            , color = $button.data('color')
            , settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                }
                , off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');
            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");
            // Set the button's icon
            $button.find('.state-icon').removeClass().addClass('state-icon ' + settings[$button.data('state')].icon);
            // Update the button's color
            if (isChecked) {
                $button.removeClass('btn-default').addClass('btn-' + color + ' active');
            }
            else {
                $button.removeClass('btn-' + color + ' active').addClass('btn-default');
            }
        }

        function init() {
            updateDisplay();
            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });
    
    $("#LoginSec").hide();
    $("#RemoveSec").hide();
    $("#menutoolbar").hide();
    $("#DashboardArrives").hide();
    $("#RegSec").hide();
    $("#loginButton").hide();
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
        $("#RegAdmin").hide();
        $("#RegEmp").hide();
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
    
    
/////////////////////////////////////////
//////////////Verify Session ///////////
////////////////////////////////////////
    
    $.ajax({
        url: 'data/applicationLayer.php'
        , type: 'POST'
        , data: {
            "action": "verifySession"
        }
        , dataType: 'json'
        , success: function (jsonResponse) {
            if (jsonResponse.state === "true") {
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
            else {
                $("#currentLogin").hide();
                $("#loginButton").show();
                $("#logoutButton").hide();
                $("#LoginSec").show();
            }
        }
        , error: function (errorMessage) {
            alert(errorMessage.responseText);
            alert("False verify");
            $("#currentLogin").hide();
        }
    });
/////////////////////////////////////////////////
/////////////////////////////////////////////////

///////////////////////////////////////////////////
///////////////// REGISTER ADMIN ////////////////// 
///////////////////////////////////////////////////

    $("#BtnAddAdmin").click(function () {
        event.preventDefault();
        $("#RegAdmin").show();
        $("#RegEmp").hide();
        $("#registerBtn").click(function () {
            if ($("#inFname").val() == ("") || $("#inLname").val() == ("") || $("#inMatricula").val() == ("") || $("#inPassword").val() == ("")) {
                alert("Fill all the blanks, please");
                $("#inFname").val("");
                $("#inLname").val("");
                $("#inPassword").val("");
                $("#inMatricula").val("");
            }
            else {
                var jsonData = {
                    "fName": $("#inFname").val()
                    , "lName": $("#inLname").val()
                    , "password": $("#inPassword").val()
                    , "mat": $("#inMatricula").val()
                    , "action": "register"
                };
                $.ajax({
                    url: "data/applicationLayer.php"
                    , type: "POST"
                    , data: jsonData
                    , dataType: 'json'
                    , success: function (jsonResponse) {
                        alert(jsonResponse.message + "!");
                        $("#RegSec").hide();
                        $("#LoginSec").hide();
                        $("#DashboardArrives").show();
                        $("#inFname").val("");
                        $("#inLname").val("");
                        $("#inPassword").val("");
                        $("#inMatricula").val("");
                    }
                    , error: function (errorMessage) {
                        alert(errorMessage.responseText);
                    }
                });
            }
        });
    });
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
      

/////////////////////////////////////////////////////
///////////////// REGISTER EMPLOYEE ////////////////// 
/////////////////////////////////////////////////////

    $("#BtnAddEmployee").click(function () {
        event.preventDefault();
        $("#RegAdmin").hide();
        $("#RegEmp").show();
        $("#registerBtn2").click(function () {
            if ($("#inFname2").val() == ("") || $("#inLname2").val() == ("") || $("#inMatricula2").val() == ("") || $("#inPosition").val() == ("")) {
                alert("Fill all the blanks, please");
                $("#inFname2").val("");
                $("#inLname2").val("");
                $("#inMatricula2").val("");
                $("#inPosition").val("");
            }
            else {
                var jsonData = {
                    "fName": $("#inFname2").val()
                    , "lName": $("#inLname2").val()
                    , "mat": $("#inMatricula2").val()
                    , "position": $("#inPosition").val()
                    , "action": "registerEmp"
                };
                $.ajax({
                    url: "data/applicationLayer.php"
                    , type: "POST"
                    , data: jsonData
                    , success: function (jsonResponse) {
                        alert(jsonResponse.message + "!");
                        $("#RegSec").hide();
                        $("#LoginSec").hide();
                        $("#DashboardArrives").show();
                        $("#inFname2").val("");
                        $("#inLname2").val("");
                        $("#inMatricula2").val("");
                        $("#inPosition").val("");
                    }
                    , error: function (errorMessage) {
                        alert(errorMessage.responseText);
                    }
                });
            }
        });
    });
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
    
    
    
/////////////////////////////////////////////////////
///////////////// DELETE EMPLOYEE ////////////////// 
/////////////////////////////////////////////////////

    $("#BtnRmvEmployee").click(function () {
        event.preventDefault();
        $("#DivRemoveEmployee").show();
        $("#DivRemoveAdmin").hide();
        $("#remove1").click(function () {
            var jsonData = {
                "mat": $("#RemoveEmployee").val()
                , "action": "removeEmployee"
            };
            $.ajax({
                url: "data/applicationLayer.php"
                , type: "POST"
                , data: jsonData
                , dataType: 'json'
                , success: function (jsonResponse) {
                    alert(jsonResponse.message + "!");
                    $("#DashboardArrives").show();
                    $("#RemoveSec").hide();
                    $("#LoginSec").hide();
                    $("#RemoveEmployee").val("");
                    
                }
                , error: function (errorMessage) {
                    alert(errorMessage.responseText);
            /*         $("#RemoveEmployee").val("");
                    $("#DashboardArrives").show();
                    $("#RemoveSec").hide();
                     $("#LoginSec").hide(); */
                }
            });
        });
    }); 
    
//////////////////////////////////////////////////
//////////////////////////////////////////////////

/////////////////////////////////////////////////
///////////////// DELETE ADMIN ////////////////// 
/////////////////////////////////////////////////

    $("#BtnRmvAdmin").click(function () {
        event.preventDefault();
        $("#DivRemoveAdmin").show();
        $("#DivRemoveEmployee").hide();
        $("#remove2").click(function () {
       
            var jsonData2 = {
                "mat": $("#RemoveAdmin").val()
                , "action": "removeAdmin"
            };
            $.ajax({
                url: "data/applicationLayer.php"
                , type: "POST"
                , data: jsonData2
                , success: function (jsonResponse2) {
                    alert(jsonResponse2.message + "!");
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
//////////////////////////////////////////////////


/////////////////////////////////////////////////
///////////////LOAD ADMINS //////////////////////
/////////////////////////////////////////////////
    $("#AdminList").click(function () {
    event.preventDefault();
        var jsonData = {
            "action": "loadAdmins"
        };
        $.ajax({
            url: "data/applicationLayer.php"
            , type: "POST"
            , data: jsonData
            , success: function (jsonResponse) {
                var postUser = "";
                if (jsonResponse.length > 0) {
                /*  LOAD in list  
                    $.each(jsonResponse, function (index) {
                        postUser += "<li>" + jsonResponse[index].mat + ": " + jsonResponse[index].fName + " " + jsonResponse[index].lName + "</li>" + "<br>";
                    });
                */
                    $.each(jsonResponse,function(index){
                        postUser += "<tr>"
                                   // +  "<td>" + $("#comName").val() + "</td>"
                                    +  "<td>" + jsonResponse[index].mat+ "</td>"
                                    +  "<td>" + jsonResponse[index].fName + " " + jsonResponse[index].lName + "</td></tr>";   
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
/////////////////////////////////////////////////

////////////////////////////////////////////////////
///////////////LOAD EMPLOYEES //////////////////////
////////////////////////////////////////////////////

    $("#EmployeeList").click(function () {
        
        event.preventDefault();
        
        var jsonData = {
            "action": "loadEmployees"
        };
        $.ajax({
            url: "data/applicationLayer.php"
            , type: "POST"
            , data: jsonData
            , success: function (jsonResponse) {
                var postUser = "";
                if (jsonResponse.length > 0) { 
                    /*  LOAD in list  
                    $.each(jsonResponse, function (index) {
                        postUser += "<li>" + jsonResponse[index].mat + ": " + jsonResponse[index].fName + " " + jsonResponse[index].lName + "</li>" + "<br>";
                    });
                */
                    $.each(jsonResponse,function(index){
                        postUser += "<tr>"
                                   // +  "<td>" + $("#comName").val() + "</td>"
                                    +  "<td>" + jsonResponse[index].mat+ "</td>"
                                    +  "<td>" + jsonResponse[index].fName + " " + jsonResponse[index].lName + "</td></tr>";   
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

/////////////////////////////////////////////////
///////////////LOGIN SECTION ////////////////////
/////////////////////////////////////////////////
    $("#loginButton").click(function () { //Session begins 
        event.preventDefault();
        var jsonData = {
            "action": "login"
            , "matricula": $("#loginMat").val()
            , "password": $("#loginPsswrd").val()
        };
        //console.log(jsonData["matricula"]);
        //console.log(jsonData["password"]);
        $.ajax({
            url: "data/applicationLayer.php"
            , type: "POST"
            , data: jsonData
            , dataType: "json"
            , contentType: "application/x-www-form-urlencoded"
            , success: function (jsonResponse) {
                alert("Welcome back " + jsonResponse.fName + " " + jsonResponse.lName);
                var newHTMLContent = "";
                newHTMLContent = jsonResponse.mat;
                $("#currentLogin").append(newHTMLContent); //currently login as
                $("#currentLogin").show();
                $("#loginButton").hide();
                $("#logoutButton").show();
                $("#PageTitle").show();
                $("#DashboardArrives").show();
                $("#menutoolbar").show();
                $("#LoginSec").hide();
                var jsonData2 = {
                    "CookieValue": jsonResponse.mat
                    , "CookieName": "matID"
                    , "action": "createCookie"
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
//////////////////////////////////////////////    

//////////////////////////////////////////////    
/////////// GET USERNAME WITH COOKIE///////////
///////////////////////////////////////////////
    $.ajax({ //Gets user name in LoginForm
        // url: "php/CookieService.php"
        url: "data/applicationLayer.php"
        , type: "POST"
        , data: {
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
            , data: {
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