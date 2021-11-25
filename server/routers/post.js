const router = require("express")();
const Post = require("../models/posts");
const { ObjectId } = require("mongodb");
const Joi = require("joi");

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.find({ userid: ObjectId(req.params.id) });

    if (post) {
      return res.send(post);
    }

    res.status(404).send(`No Posts Available`);
  } catch (error) {
    res.send(`${error} Occured`);
  }
});
router.get("/", async (req, res) => {
  try {
    const post = await Post.find();

    if (post) {
      return res.send(post);
    }

    res.status(404).send(`No Posts Available`);
  } catch (error) {
    res.send(`${error} Occured`);
  }
});

router.post("/", async (req, res) => {
  try {
    let { error } = postValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const newpost = new Post({
      body: req.body.body,
      images: req.body.images,
      userid: ObjectId(req.body.userid),
    });

    res.send(await newpost.save());
  } catch (error) {
    res.send(`${error} Occured`);
  }
});

router.post("/react", async (req, res) => {
  try {
    let { error } = reactValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findById(ObjectId(req.body.postid)).catch(
      (error) => {
        res.send(`${error} Error Occured`);
      }
    );
    let info = { ...req.body };
    delete info.postid;
    res.send(await post.updateOne({ $push: { likes: info } }));
  } catch (error) {}
});

router.post("/comment", async (req, res) => {
  try {
    let info = { ...req.body };
    delete info.postid;
    let { error } = comentValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findById(ObjectId(req.body.postid)).catch(
      (error) => {
        res.send(`${error} Error Occured`);
      }
    );

    res.send(await post.updateOne({ $push: { comments: info } }));
  } catch (error) {}
});

router.put("/", async (req, res) => {
  try {
    const post = await Post.findById(ObjectId(req.body.postid));
    if (post) {
      let info = { ...req.body };
      delete info.postid;
      res.send(await post.updateOne(info));
    } else {
      res.status(404).send(`No Post found`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/", (req, res) => {
  res.send(`delete post `);
});

const postValidation = (obj) => {
  let schema = Joi.object({
    body: Joi.string().required(),
    images: Joi.array(),
    userid: Joi.string().required(),
  });
  return schema.validate(obj);
};
const reactValidation = (obj) => {
  let schema = Joi.object({
    postid: Joi.string().required(),
    type: Joi.string().required(),
    userid: Joi.string().required(),
  });
  return schema.validate(obj);
};
const comentValidation = (obj) => {
  let schema = Joi.object({
    postid: Joi.string().required(),
    body: Joi.string().required(),
    userid: Joi.string().required(),
  });
  return schema.validate(obj);
};

module.exports = router;
