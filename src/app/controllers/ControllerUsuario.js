import * as Yup from 'yup';
import Usuario from '../models/Usuario';
import Arquivo from '../models/Arquivo';

class ControllerUsuario {
  async store(req, res) {
    const schema = Yup.object().shape({
      apelido: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().required().min(8),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Erro de validação' });
    }
    const usuarioExistente = await Usuario.findOne({
      where: { email: req.body.email },
    });
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Usuário já existente' });
    }
    const { id, apelido, email } = await Usuario.create(req.body);

    return res.json({
      id,
      apelido,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      apelido: Yup.string(),
      email: Yup.string().email(),
      senhaAntiga: Yup.string().min(8),
      senha: Yup.string()
        .min(6)
        .when('senhaAntiga', (senhaAntiga, campo) =>
          senhaAntiga ? campo.required() : campo
        ),
      confirmacaoSenha: Yup.string().when('senha', (senha, campo) =>
        senha ? campo.required().oneOf([Yup.ref('senha')]) : campo
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Erro de validação' });
    }
    const { email, senhaAntiga } = req.body;

    const usuario = await Usuario.findByPk(req.usuarioId);
    if (email !== usuario.email) {
      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ erro: 'Usuario já existente' });
      }
    }
    if (senhaAntiga && (await usuario.verificarSenha(senhaAntiga))) {
      return res.status(401).json({ erro: 'Senhas não batem' });
    }

    const { id, apelido } = await usuario.update(req.body);
    return res.json({
      id,
      apelido,
      email,
    });
  }

  async index(req, res) {
    const usuario = await Usuario.findAll({
      attributes: ['id', 'apelido', 'email', 'avatar_id'],
      include: [
        {
          model: Arquivo,
          as: 'avatar',
          attributes: ['nome', 'caminho', 'url'],
        },
      ],
    });
    return res.json(usuario);
  }

  async show(req, res) {
    const usuario = await Usuario.findByPk(req.usuarioId, {
      attributes: ['id', 'apelido', 'email', 'avatar_id'],
      include: [
        {
          model: Arquivo,
          as: 'avatar',
          attributes: ['nome', 'caminho', 'url'],
        },
      ],
    });
    if (usuario === null) {
      return res.status(400).json({ erro: 'Usuário não existente' });
    }
    return res.json(usuario);
  }
}

export default new ControllerUsuario();
