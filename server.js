const app = require('./app.js');

app.set('port',3000);

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