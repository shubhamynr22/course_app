// Middleware for handling auth
function adminMiddleware(req, res, next) {
  try {
    const { username, password } = req.headers;
    if (
      !Admin.findOne({
        username: username,
        password: password
      })
    ) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = adminMiddleware;
