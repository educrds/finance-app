import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import dotenv from 'dotenv';

const process = dotenv.config();

const client = jwksClient({
  jwksUri: process.parsed.AUTH0_KEYS,
});

// Caminho para a chave privada local
export const privateKey = process.parsed.PRIVATE_KEY;

// Função para obter a chave pública do JWKS
const getKey = (header) => {
  return new Promise((resolve, reject) => {
    client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        reject(err);
      } else {
        const signingKey = key.getPublicKey();
        resolve(signingKey);
      }
    });
  });
};

// Função para verificar o token JWT
const verifyJwtToken = (token, key, algorithms) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, { algorithms }, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

// Middleware para verificar token JWT
export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token || isTokenExpired(token)) {
    return res.status(401).send({ message: 'Usuário não autenticado.' });
  }

  try {
    const decodedToken = jwt.decode(token, { complete: true });
    let decoded;

    if (decodedToken && decodedToken.header?.kid) {
      // Token emitido pelo Auth0
      const key = await getKey(decodedToken.header);
      decoded = await verifyJwtToken(token, key, ['RS256']);
    } else {
      // Token gerado localmente com jwt.sign
      decoded = await verifyJwtToken(token, privateKey, ['RS256']);
    }

    req.body.user = decoded;
    next();
  } catch (err) {
    res.status(403).send({ message: 'Token inválido.' });
  }
};

const isTokenExpired = (token) => {
  const decoded = jwt.decode(token);
  return decoded?.exp * 1000 < Date.now();
};
