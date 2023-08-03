const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in index")
})

/* PUT user update */
router.put("/users", (req, res, next) => {
  res.json("All good in index")
})

/* GET user */


/* POST upload */

module.exports = router;
