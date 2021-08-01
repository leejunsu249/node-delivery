require('./removeByValue')();


module.exports =  (io) => {

  let userList = []; //사용자 리스트를 저장할곳

  io.on('connection', (socket) => { 
      
      const session = socket.request.session.passport;
      const user = (typeof session !== 'undefined') ? ( session.user ) : "";

      if(!userList.includes(user.displayname)){
        userList.push(user.displayname);
      }
      io.emit('join', userList);

      socket.on('client message', (data) => {
          io.emit('server message', { message : data.message , displayname : user.displayname });
      });

      socket.on('disconnect', () => {            
        userList.removeByValue(user.displayname);
        io.emit('leave', userList);
      });

  });
};