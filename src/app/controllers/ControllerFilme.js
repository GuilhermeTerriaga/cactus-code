import * as Yup from 'yup';
import Filme from '../models/Filme';

class ControllerListas {
  async store(req, res) {
    const schema = Yup.object().shape({
      tmdbId: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Erro na validação dos dados enviados',
      });
    }

    const { tmdbId } = await Filme.create(req.body);

    return res.json({
      tmdbId,
    });
  }
}
export default new ControllerListas();
