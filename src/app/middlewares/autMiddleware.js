import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import autConfig from '../../config/auth';

export default async (req, res, next) => {
  console.log(req.headers);
  const autHeader = req.headers.authorization;
  if (!autHeader) {
    return res.status(401).json({ error: 'Token não enviado' });
  }

  const [, token] = autHeader.split(' ');

  try {
    const senhaDecodificada = await promisify(jwt.verify)(
      token,
      autConfig.secret
    );
    req.body.usuario_id = senhaDecodificada.id;
    req.usuarioId = senhaDecodificada.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalido' });
  }
};
