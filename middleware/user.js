const { User } = require('../db/index');

async function userMiddleware(req, res, next) {
  try {
    const { username, password } = req.headers;
    const isValid = await User.findOne({
      username: username,
      password: password
    });
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal server error` });
  }
}

module.exports = userMiddleware;
