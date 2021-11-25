const express = require("express");
const app = express();
const users = require("./routers/user");
const posts = require("./routers/post");
const Mongoose = require("mongoose");

app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to uBoz a metaverse Company"));

app.use("/users", users);
app.use("/posts", posts);

const PORT = 6000 || process.env.PORT;

app.listen(PORT, async () => {
  console.log(`Server is running http://localhost:${PORT}`);
  await Mongoose.connect("mongodb://localhost:27017/uBoz", () =>
    console.log(`db Connected`)
  );
});
