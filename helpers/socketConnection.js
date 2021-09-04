require('./removeByvalue')();


module.exports =  (io) => {

  let userList = []; //사용자 리스트를 저장할곳
  let userSocketId = {};

  io.on('connection', (socket) => { 
      
      const session = socket.request.session.passport;
      const user = (typeof session !== 'undefined') ? ( session.user ) : "";
      
      if(typeof user == 'undefined') return;
      userSocketId[user.id] = socket.id;

      socket.on('client order', (data) => {
        const socketId = userSocketId[data.user_id];
        socket.to(socketId).emit('server order');
      })
      
      if(!userList.includes(user.displayname)){
        userList.push(user.displayname);
      }
      io.emit('join', userList);

      socket.on('client message', (data) => {
          io.emit('server message', { message : data.message , displayname : user.displayname });
      });

      socket.on('disconnect', () => {            
        userList.removeByvalue(user.displayname);
        io.emit('leave', userList);
      });

  });
};