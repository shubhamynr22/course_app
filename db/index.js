const mongoose = require('mongoose');

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://shubhamynr22:fgBPM9WM0IwQWEhW@test.zbrvx2w.mongodb.net/course_app')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(`Error in connecting to MongoDB : ${error}`);
  });

// Define schemas
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
  Admin,
  User,
  Course
};
