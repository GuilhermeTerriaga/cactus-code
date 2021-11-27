import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import autConfig from '../../config/auth';
import Arquivo from '../models/Arquivo';
import Usuario from '../models/Usuario';

class ControllerSessao {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      apelido: Yup.string(),
      senha: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        erro: 'Erro na validação dos dados',
      });
    }
    const { email, senha, apelido } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        [Op.or]: [
          {
            email: {
              [Op.eq]: email,
            },
          },
          {
            apelido: {
              [Op.eq]: apelido,
            },
          },
        ],
      },
      include: [
        {
          model: Arquivo,
          as: 'avatar',
          attributes: ['id', 'caminho', 'url'],
        },
      ],
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }
    if (!(await usuario.verificarSenha(senha))) {
      return res.status(401).json({ erro: 'Senhas não batem' });
    }
    const { id, avatar } = usuario;

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
