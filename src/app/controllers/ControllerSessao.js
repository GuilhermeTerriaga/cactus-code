import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import Usuario from '../models/Usuario';
import Arquivo from '../models/Arquivo';
import autConfig from '../../config/auth';

class ControllerSessao {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        erro: 'Erro na validação dos dados enviados, manda direito Gu!',
      });
    }
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({
      where: { email },
      include: [
        { model: Arquivo, as: 'avatar', attributes: ['id', 'caminho', 'url'] },
      ],
    });
    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }
    if (!(await usuario.verificarSenha(senha))) {
      return res.status(401).json({ erro: 'Senhas não batem' });
    }
    const { id, apelido, avatar } = usuario;

    return res.json({
      usuario: {
        id,
        apelido,
        email,
        avatar,
      },
      token: jwt.sign({ id }, autConfig.secret, {
        expiresIn: autConfig.expiresIn,
      }),
    });
  }
}

export default new ControllerSessao();
