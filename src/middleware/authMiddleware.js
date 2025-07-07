import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'Access token missing' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log(`err :- ${err}`);
      return res.status(403).json({ message: 'Invalid token' })
    };
    req.user = user;
    next();
  });
}
