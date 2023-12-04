import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
    
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
        // console.log('You are not logged in.');
        // res send status 401 you are not logged in
        res.redirect('/login');
        res.status(400).json({message:"You are not logged in."})
        // res.redirect('/login');
      } else {
        
        //console.log("role "+decodedToken.role)
        next();
      }
    });
  } else {
    res.status(400).json({message:"You are not logged in."})
    //res.render('login');

  }
};


