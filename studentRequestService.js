
function StudentRequestService( studentRequestDAO){

    winston = require('winston')
    md5 = require('md5.js')
    logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log' })
        ]
    });
    if(studentRequestDAO != undefined && studentRequestDAO != null){
        this.studentRequestDAO = studentRequestDAO;
    }
    else {
        this.studentRequestDAO = require('./studentRequestDAO')
    }
}

StudentRequestService.prototype.listStats = function(callback){
    this.studentRequestDAO.readStats((requests) => {
        logger.info(`${requests.length} stats were sent!`)
        callback(requests)
    })
}

StudentRequestService.prototype.listRequests = function(callback){
    this.studentRequestDAO.readRequests((requests) => {
        logger.info(`${requests.length} requests were found!`)
        callback(requests)
    })
}

StudentRequestService.prototype.listRequestsOfStudent = function(shutterType, callback){
    this.studentRequestDAO.readRequestsOfStudent(shutterType, (requests) =>{
        logger.info(`${requests.length} requests were found!`)
        callback(requests)
    })
}


StudentRequestService.prototype.submitRequest = function(request,success, error){
    request['date'] = new Date().toISOString()
    request['sign'] = new md5().update(JSON.stringify({
        firstname : request['firstname'],
        lastname : request['lastname'],
        email : request['email'],
        city: request['city'] ,
        street : request['street'],
        houseNo : request['houseNo'],
        zipcode : request['zipcode'],
        shutter : request['shutter'] ,
        sizev : request['sizev'],
        sizeh : request['sizeh'],
        date : request['date'],
        munkas : request['munkas']})).digest('hex')
    this.studentRequestDAO.createRequest(request, ()=>{success()})
}

StudentRequestService.prototype.submitAcceptOrder = function(request,success, error){
    this.studentRequestDAO.acceptRequest(request, ()=>{success()})
}

module.exports = StudentRequestService;