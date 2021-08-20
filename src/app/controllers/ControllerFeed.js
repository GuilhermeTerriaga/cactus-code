import Usuario from '../models/Usuario';
import GeneroCinematografico from '../models/GeneroCinematografico';

class ControllerFeed {
  async show(req, res) {
    const usuarioFeed = await Usuario.findByPk(req.usuarioId, {
      attributes: [
        'id',
        'apelido',
        'usuariosSeguidos',
        'generoCinematografico',
      ],
      include: [
        {
          model: GeneroCinematografico,
          as: 'generoCinematografico',
          attributes: ['nome'],
        },
      ],
    });
    if (usuarioFeed === null) {
      return res.status(400).json({ erro: 'Erro na busca do feed' });
    }
    return res.json(usuarioFeed);
  }
}

export default new ControllerFeed();
