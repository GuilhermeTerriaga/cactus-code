import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import autConfig from '../../config/auth';

export default async (req, res, next) => {
  const autHeader = req.headers.authorization;
  if (!autHeader) {
    return res.status(401).json({ error: 'Token não enviado' });
  }

  const [, token] = autHeader.split(' ');
  const isAdmin = true;

  try {
    const senhaDecodificada = await promisify(jwt.verify)(
      token,
      autConfig.secret,
      isAdmin
    );
    if (!senhaDecodificada.isAdmin) {
      return res.status(401).json({ error: 'Token invalido' });
    }
    console.log(senhaDecodificada);
    req.body.usuario_id = senhaDecodificada.id;
    req.usuarioId = senhaDecodificada.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalido' });
  }
};
