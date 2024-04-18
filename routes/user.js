const { Router } = require('express');
const router = Router();
const userMiddleware = require('../middleware/user');
const { User, Course } = require('../db/index');
// User Routes
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.create({
      username: username,
      password: password,
      purchasedCourses: []
    });
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Internal server error' });
  }
});

router.get('/courses', async (req, res) => {
  const courses = await Course.find({});
  res.status(400).json({
    courses: courses
  });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  const { username } = req.headers;
  const courseId = req.params.courseId;
  await User.updateOne(
    {
      username: username
    },
    {
      $push: { purchasedCourses: courseId }
    }
  );
  res.status(200).json({ message: 'Course purchased successfuly' });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  const { username } = req.headers;
  const courseIds = await User.findOne({
    username: username
  });
  const courses = await Course.find({
    _id: { $in: courseIds.purchasedCourses }
  });
  res.status(200).json({ purchasedCourses: courses });
});

module.exports = router;
