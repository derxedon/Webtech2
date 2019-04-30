$(document).ready(function(){
    $.getJSON('/listRequests', function( data ) {
        for (var i = 0; i < data.length; i++) {
            var request = data[i];
            $('#orders').append("<tr><td>"+ request.lastname +" " + request.firstname + "</td>"+
                "<td>"+ request.email +"</td>"+
                "<td>"+ request.city + ", " + request.street + ", " + request.houseNo + ", " + request.zipcode + "</td>"+
                "<td class='hoverId'>"+ request.shutter + "<span class='tooltipText'>"+"Tooltip text" +"</span></td>"+
                "<td>"+ request.sizev + " X " + request.sizeh +"</td>"+
                "<td>"+ request.sign +"</td>"+
                "</tr>");
        }
    });
    $(".hoverId").hover(()=>{
      if($(".hoverId").val()==='plastic'){
         $(this).text("3db műanyag izé ,4db alumínium hozé");
      }
      else if($(".hoverId").val()==='titan'){
          $(this).text("1db titán izé ,8db vas hozé");
      }
    })
});