
$(document).ready(function() {
    $.getJSON('/listRequests', function (data) {
        for (var i = 0; i < data.length; i++) {
            var request = data[i];
            $('#orders').append("<tr><td>" + request.lastname + " " + request.firstname + "</td>" +
                "<td>" + request.email + "</td>" +
                "<td>" + request.city + ", " + request.street + ", " + request.houseNo + ", " + request.zipcode + "</td>" +
                "<td>" + request.shutter + "</td>" +
                "<td>" + request.sizev + " X " + request.sizeh + "</td>" +
                "<td>" + request.munkas + "</td>" +
                "</tr>");
        }
    });
    $.getJSON('/listStats', function (data) {
        var stats = data;
        $('#statistics').append("<tr><td>" + stats.allorders + "</td>" +
            "<td>" + stats.unacceptedorders + "</td>" +
            "</tr>");
    });
});