import * as Yup from 'yup';
import Listas from '../models/Listas';

class ControllerListas {
  async store(req, res) {
    const schema = Yup.object().shape({
      titulo: Yup.string().required(),
      corpo: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Erro na validação dos dados enviados',
      });
    }

    const { titulo, corpo, usuarioId } = await Listas.create(req.body);

    return res.json({
      titulo,
      corpo,
      usuarioId,
    });
  }
}
export default new ControllerListas();
