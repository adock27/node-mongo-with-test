const router = require('express').Router();
const auth = require("../auth/auth");
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const { user, token } = await auth.authenticateUser(name, password);
    res.json({ data: { user, token }, status: "success" });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.post('/register', async (req, res) => {


  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res.status(400).json({ error: 'Email ya registrado' })
  }

  // hash contraseña
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password
  });
  
  try {
    const savedUser = await user.save();
    res.json({
      error: null,
      data: savedUser
    })
  } catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router;