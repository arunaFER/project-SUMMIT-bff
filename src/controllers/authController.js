// authController.js

const signUp = (req, res) => {
  // res.json(req.body);
  res.send("SignUp!");
};

const signIn = (req, res) => {
  // res.json(req.body);
  res.send("SignIn!");
};

const signOut = (req, res) => {
  res.send("SignOut!");
};

export { signUp, signIn, signOut };
