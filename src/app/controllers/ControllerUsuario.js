/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import autConfig from '../../config/auth';
import mail from '../../config/mail';
import Arquivo from '../models/Arquivo';
import Usuario from '../models/Usuario';

class ControllerUsuario {
  async store(req, res) {
    console.log(req.body);
    const schema = Yup.object().shape({
      apelido: Yup.string().required(),
      personagemFav: Yup.string().required(),
      email: Yup.string().email().required(),
      dtNascimento: Yup.date().required(),
      emailSecundario: Yup.string().email().required(),
      senha: Yup.string().required().min(8),
      genero: Yup.string().required(),
      arquivo_id: Yup.number().integer(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Erro na validação dos dados' });
    }
    const usuarioExistente = await Usuario.findOne({
      where: { email: req.body.email },
    });
    const { emailSecundario, email } = req.body;
    if (emailSecundario === email) {
      return res.status(400).json({ erro: 'Erro na validação dos dados' });
    }
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Usuário já existente' });
    }
    const {
      id,
      apelido,
      personagemFav,
      dtNascimento,
      genero,
      isAdmin,
    } = await Usuario.create(req.body);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: mail.mail,
        pass: mail.pass,
      },
    });
    const mailOptions = {
      from: mail.from, // sender address
      to: [email, emailSecundario], // receiver (use array of string for a list)
      subject: mail.subjectNewUser, // Subject line
      html: mail.mailNewUser, // plain text body
    };
    await transporter.sendMail(mailOptions).then(
      (sentMessage) => {
        console.log(sentMessage);
      },
      (error) => {
        console.log(error);
      }
    );
    return res.json({
      id,
      apelido,
      email,
      token: jwt.sign({ id }, autConfig.secret, {
        expiresIn: autConfig.expiresIn,
      }),
      genero,
      isAdmin,
      emailSecundario,
      personagemFav,
      dtNascimento,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      apelido: Yup.string(),
      email: Yup.string().email().required(),
      emailSecundario: Yup.string().email(),
      personagemFav: Yup.string(),
      dtNascimento: Yup.date(),
      senhaAntiga: Yup.string().min(8),
      genero: Yup.string(),
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
      return res.status(400).json({ erro: 'Erro na validação dos dados' });
    }
    const { email, senhaAntiga } = req.body;
    const { emailSecundario } = req.body;

    const usuario = await Usuario.findByPk(req.usuarioId);
    if (email !== usuario.email) {
      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ erro: 'Email de usuario já existente' });
      }
    } else if (emailSecundario !== usuario.emailSecundario) {
      const usuarioExistente = await Usuario.findOne({
        where: { emailSecundario },
      });
      if (usuarioExistente) {
        return res.status(400).json({ erro: 'Email de usuario já existente' });
      }
    }
    if (senhaAntiga && !(await usuario.verificarSenha(senhaAntiga))) {
      return res.status(401).json({ erro: 'Senhas não batem' });
    }

    await usuario.update(req.body);
    const {
      id,
      apelido,
      arquivo_id,
      personagemFav,
      dtNascimento,
      genero,
    } = await Usuario.findByPk(req.usuarioId, {
      include: [
        {
          model: Arquivo,
          as: 'avatar',
          attributes: ['nome', 'caminho', 'url'],
        },
      ],
    });
    return res.json({
      id,
      personagemFav,
      dtNascimento,
      apelido,
      email,
      arquivo_id,
      genero,
    });
  }

  async index(req, res) {
    const usuario = await Usuario.findAll({
      attributes: [
        'id',
        'apelido',
        'email',
        'arquivo_id',
        'dtNascimento',
        'emailSecundario',
        'personagemFav',
      ],
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

  async search(req, res) {
    const schema = Yup.object().shape({
      apelido: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação dos dados' });
    }
    const { apelido } = req.body;
    const busca = `${apelido}%`;
    const usuario = await Usuario.findAll({
      where: { apelido: { [Op.iLike]: busca } },
      attributes: ['id', 'apelido', 'email', 'arquivo_id'],
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

  async show(req, res) {
    const usuario = await Usuario.findByPk(req.usuarioId, {
      attributes: [
        'id',
        'apelido',
        'email',
        'arquivo_id',
        'dtNascimento',
        'emailSecundario',
        'personagemFav',
        'genero',
      ],
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

  async recover(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      emailSecundario: Yup.string().email(),
      personagemFav: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Erro na validação dos dados' });
    }
    const { email, emailSecundario, personagemFav } = req.body;
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
              [Op.eq]: emailSecundario,
            },
          },
        ],
      },
    });
    if (usuario === null || usuario.personagemFav !== personagemFav) {
      return res.status(401).json({ erro: 'Erro na validação dos dados' });
    }
    const { id } = usuario;
    const token = jwt.sign({ id }, autConfig.secret, {
      expiresIn: autConfig.recoverexpiresIn,
    });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: mail.mail,
        pass: mail.pass,
      },
    });
    const mensagem = mail.htmlRecover.replace(
      /REPLACE/g,
      `${mail.link}?token=${token}`
    );
    const mailOptions = {
      from: mail.from, // sender address
      to: [usuario.email, usuario.emailSecundario], // receiver (use array of string for a list)
      subject: mail.subjectRecover, // Subject line
      html: mensagem, // plain text body
    };
    await transporter.sendMail(mailOptions).then(
      (sentMessage) => {
        console.log(sentMessage);
      },
      (error) => {
        console.log(error);
        return res.status(400).json({ erro: 'email não enviado' });
      }
    );
    return res.status(200).json({ successo: 'email enviado' });
  }

  async newPassword(req, res) {
    const schema = Yup.object().shape({
      senha: Yup.string().min(8).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Erro na validação dos dados' });
    }

    const usuario = await Usuario.findByPk(req.usuarioId);
    if (usuario === null) {
      return res
        .status(401)
        .json({ erro: 'Erro na validação dos dados, token invalido' });
    }
    await usuario.update(req.body);
    return res.status(200).json({
      sucesso: 'Senha redefinida',
    });
  }
}

export default new ControllerUsuario();
