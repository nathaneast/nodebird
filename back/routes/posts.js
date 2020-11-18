const express = require('express');
const router = express.Router();

const { Post, User, Image, Comment } = require("../models");

router.get('/', async (req, res ,next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        }, 
        {
          model: Comment,
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
          }],
        },
        {
          model: User,
          as: "Likers",
          attributes: ["id"],
        }
      ],
    });
    console.log(posts, 'loadPosts');
    res.status(200).json(posts);
  } catch (error) {
    console.error(errorr);
    next(error);
  }
});

module.exports = router;
