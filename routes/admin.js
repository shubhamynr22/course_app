const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const router = Router();
const { Admin, Course } = require('../db/index');

// Admin Routes
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    await Admin.create({
      username: username,
      password: password
    });
    res.status(200).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failesd to create admin' });
  }
});

router.post('/courses', adminMiddleware, async (req, res) => {
  const { title, description, price, imageLink } = req.body;

  const newCourse = await Course.create({
    title: title,
    description: description,
    price: parseInt(price),
    imageLink: imageLink
  });

  res.status(200).json({ message: 'Course created successfully', courseId: newCourse._id });
});

router.get('/courses', adminMiddleware, async (req, res) => {
  const courses = await Course.find();
  res.status(200).json({
    courses: courses
  });
});

module.exports = router;
