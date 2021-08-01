exports.isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
      res.redirect('/accounts/login');
  }else{
      next();
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      next();
  } else {
      res.send('<script>alert("로그인한 상태입니다."); \
          javascript:history.back();</script>');
  }
};