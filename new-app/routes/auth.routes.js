const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/", (req, res, next) => {
  res.json("All good in index")
})

/* POST Signup */
router.post("/signup", async (req, res, next) => {
  const payload = req.body

  const salt = bcrypt.genSaltSync(12);
  const passwordHash = bcrypt.hashSync(payload.password, salt)

  try {
    const potentialUser = await User.findOne({ username: payload.username })
    if (!potentialUser) {
      const newUser = await User.create({ username: payload.username, password: passwordHash, campus: payload.campus, course: payload.course, image: payload.image })
      res.status(201).json({ user: newUser })
    }else{
      res.status(304).send({ errorMessage: "User with this name already exists"})
    }
  } catch (error) {
    res.status(500).json({errorMessage: "A new user could not be created"})
  }
});


/* POST Login */
router.post("/login", async (req, res, next) => {
  const payload = req.body

  // check for existing user
  const potentialUser = await User.findOne({ username: payload.username })
  if (potentialUser) {
    const passwordMatch = bcrypt.compareSync(payload.password, potentialUser.password)
    if (passwordMatch) {
      // assign JWT Token
      const authToken = jwt.sign(
        { userId: potentialUser.id },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "6h"
        })
        
        console.log('authToken: ', authToken);
      res.status(200).json({ authToken: authToken })
    } else {
      // no password-match
      res.status(403).json({ errorMessage: "Issues logging in" })
    }

  } else {
    // no user found
    res.status(403).json({ errorMessage: "Login denied" })
  }
});

/* GET verify */
router.get("/verify", isAuthenticated, async (req, res) => {
  console.log('req: ', req);

  const currentUser = await User.findById(req.payload.userId)
  res.status(200).json({message: 'Token is valid', currentUser})
})

module.exports = router;
