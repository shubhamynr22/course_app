const { Admin } = require('../db/index');
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  try {
    const { username, password } = req.headers;
    const isValid = await Admin.findOne({
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

module.exports = adminMiddleware;
