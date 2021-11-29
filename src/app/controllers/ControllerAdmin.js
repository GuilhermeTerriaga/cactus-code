/* eslint-disable camelcase */
import { Op } from 'sequelize';
import * as Yup from 'yup';
import Arquivo from '../models/Arquivo';
import Resenha from '../models/Resenha';
import Usuario from '../models/Usuario';

class ControllerAdmin {
  async deleteUser(req, res) {
    const schema = Yup.object().shape({
      apelido: Yup.string(),
      email: Yup.string().email(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Erro na validação dos dados' });
    }
    const { email, apelido } = req.body;
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
    });
    if (usuario === null) {
      return res.status(401).json({ erro: 'Usuario não existe!' });
    }
    const { id } = usuario.id;
    const exid = usuario.id;
    await usuario.destroy({ where: { id } }).then(() => {
      console.log(`usuario de id ${exid} deletado!`);
    });
    return res.status(200).json({ sucesso: 'Usuário deletado' });
  }
  // find by pk para deletar resenha

  async deleteResenha(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Erro na validação dos dados' });
    }
    const { id } = req.body;

    const resenha = await Resenha.findByPk(id);
    if (!resenha) {
      return res.status(400).json({ erro: 'Resenha inexistente' });
    }
    await resenha.destroy({ where: { id } }).then(() => {
      return res.status(200).json({ sucesso: 'Resenha deletada' });
    });
    return res.status(200).json({ sucesso: 'Resenha deletada' });
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
}

export default new ControllerAdmin();
