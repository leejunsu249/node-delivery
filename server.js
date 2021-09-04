const app = require('./app.js');
const port_number = process.env.APPID;

if(process.env.TRAVIS){
    app.set('port',3000);
}
else{
    app.set('port',port_number);
}


const server = app.listen( app.get('port'), function(){
    console.log('Express listening on port',app.get('port'));
});

const listen = require('socket.io');
const io = listen(server);

//socket io passport 접근하기 위한 미들웨어 적용
io.use( (socket, next) => {
    app.sessionMiddleWare(socket.request, socket.request.res, next);
});

require('./helpers/socketConnection')(io);