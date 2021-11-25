const router = require("express")();
const Users = require("../models/users");

router.get("/", async (req, res) => {
  try {
    res.send(await Users.find());
  } catch (error) {
    res.status(400).send(`Error`);
  }
});
router.post("/", async (req, res) => {
  try {
    const user = new Users({
      name: req.body.name,
      username: req.body.username,
      photo: req.body.photo,
      password: req.body.password,
    });

    res.send(await user.save());
  } catch (error) {
    res.status(400).send(`Error`);
  }
});
router.put("/", (req, res) => {});
router.delete("/", (req, res) => {});

module.exports = router;
