import * as Yup from 'yup';
import Arquivo from '../models/Arquivo';
import Filme from '../models/Filme';
import Resenha from '../models/Resenha';
import Usuario from '../models/Usuario';

class ControllerResenha {
  async store(req, res) {
    console.log(typeof req.body.tmdbId);
    const schema = Yup.object().shape({
      titulo: Yup.string().required(),
      corpo: Yup.string().required().max(550),
      veredito: Yup.boolean(),
      nota: Yup.number().required().max(5.0).min(0),
      tmdbId: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Erro na validação dos dados enviados',
      });
    }
    const { titulo, corpo, nota, veredito } = req.body;
    const { tmdbId } = req.body;
    const filme = await Filme.findOrCreate({
      attributes: ['id', 'tmdb_id'],
      where: {
        tmdb_id: tmdbId,
      },
      raw: true,
      plain: true,
      defaults: {
        tmdbId,
      },
    });
    console.log(filme);
    if (filme[2] === true) {
      const resenhaCriada = await Resenha.create({
        titulo,
        corpo,
        nota,
        veredito,
        usuario_id: req.usuarioId,
        filmes_id: filme.id,
      });
      return res.json({
        resenhaCriada,
        filme: {
          include: [
            {
              model: Filme,
              as: 'filme',
              tmdbId,
            },
          ],
        },
      });
    }
    const id = Number(filme[0].id);
    const resenhaCriada = await Resenha.create({
      titulo,
      corpo,
      nota,
      veredito,
      usuario_id: req.usuarioId,
      filmes_id: id,
    });
    return res.json({
      resenhaCriada,
      filme: {
        include: [
          {
            model: Filme,
            as: 'filme',
            tmdbId,
          },
        ],
      },
    });
  }

  async index(req, res) {
    const resenha = await Resenha.findAll({
      attributes: ['id', 'titulo', 'corpo', 'nota', 'veredito'],
      include: [
        {
          model: Filme,
          as: 'filme',
          attributes: ['tmdbId'],
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['apelido'],
          include: [
            {
              model: Arquivo,
              as: 'avatar',
              attributes: ['caminho', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(resenha);
  }
}
export default new ControllerResenha();
