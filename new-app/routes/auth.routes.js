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
    const newUser = await User.create({ username: payload.username, password: passwordHash, campus: payload.campus, course: payload.course, image: payload.image })
    res.status(201).json({ user: newUser })
  } catch (error) {
    res.status(500).json(error)
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
      res.status(201).json({ authToken: authToken })
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
router.get("/verify", isAuthenticated, (req, res) => {
    console.log('req payload: ', req.payload);
    res.status(200).json(req.payload);
})

module.exports = router;
