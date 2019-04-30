

$(document).ready(function() {
    $("#stuff").load("home.html");

    $("#menuButton").click(function () {
        $("#stuff").empty().load("home.html");
        });


    $("#menuButton1").click(function(){
        $("#stuff").empty().load("munkas.html");
        });


    $("#menuButton2").click(function(){
        $("#stuff").empty().load("fonok.html");
        });


    $("#menuButton3").click(function(){
        $("#stuff").empty().load("order.html");
        });


});

