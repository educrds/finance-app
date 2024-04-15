import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).send({ message: 'Usuário não autenticado.' });
    return;
  }

  jwt.verify(token, 'seu_segredo_secreto', (err, decoded) => {
    if (err) {
      res.status(403).send({ message: 'Token inválido.' });
      return;
    }
    req.body.user = decoded;
    next();
  });
};
