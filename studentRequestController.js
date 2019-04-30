var express = require('express');
var router = express.Router();

var srs = require('./studentRequestService')
const studentRequestService = new srs()

router.post('/acceptOrder',(req,res) =>{
    studentRequestService.submitAcceptOrder(
        {munkasname : req.body.munkasName, munkacode : req.body.munkaCode},
        () => {res.status(200).send("Munka elfogadva")},
        (cause) => {res.status(400).send(cause)}
    )
})

router.get('/listStats',(req,res) =>{
    studentRequestService.listStats((requests) =>{
        res.status(200).send(requests)
    })
})

router.get('/listRequests',(req,res) =>{
    if(req.query.shutterType != undefined){

        studentRequestService.listRequestsOfStudent(req.query.shutterType, (requests)=>{
            res.status(200).send(requests)
        })
        return;
    }
    studentRequestService.listRequests((requests) =>{
        res.status(200).send(requests)
    })
})

router.post('/submitRequest', (req,res) =>{
    var name1=req.body.firstName;
    var name2=req.body.lastName;
    var Email=req.body.email;
    var City=req.body.city;
    var Street=req.body.street;
    var HouseNo=req.body.houseNo;
    var Zipcode=req.body.zipCode;
    var shutter=req.body.shutterType;
    var size1=req.body.sizeVertical;
    var size2=req.body.sizeHorizontal;
    var Munkas="";

    if(name1 == undefined || name1 === ""){
        res.status(414).send("Student name must be defined");
        return;
    }
    if(name2 == undefined || name2 === ""){
        res.status(414).send("Student name must be defined");
        return;
    }
    if(Email == undefined || Email === ""){
        res.status(414).send("Student ID must be defined");
        return;
    }
    if(City == undefined || City === ""){
        res.status(414).send("Student ID must be defined");
        return;
    }
    if(Street == undefined || Street === ""){
        res.status(414).send("Student ID must be defined");
        return;
    }
    if(HouseNo == undefined || HouseNo === ""){
        res.status(414).send("Student ID must be defined");
        return;
    }
    if(Zipcode == undefined || Zipcode === ""){
        res.status(414).send("Student ID must be defined");
        return;
    }
    if(shutter == undefined || shutter === ""){
        res.status(414).send("Student programme name must be defined");
        return;
    }
    if(size1 === undefined || size1 === "") {
        res.status(414).send("Request description must be defined");
        return;
    }
    if(size2 === undefined || size2 === "") {
        res.status(414).send("Request description must be defined");
        return;
    }
    studentRequestService.submitRequest(
        {firstname : name1, lastname : name2, email : Email, city:City , street :Street,houseNo:HouseNo, zipcode : Zipcode,shutter : shutter ,sizev :size1, sizeh : size2, munkas:Munkas},
        () => {res.status(200).send("Request recorded")},
        (cause) => {res.status(400).send(cause)}
        )
})

module.exports = router;