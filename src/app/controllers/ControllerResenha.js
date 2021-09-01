import * as Yup from 'yup';
import Resenha from '../models/Resenha';

class ControllerResenha {
  async store(req, res) {
    const schema = Yup.object().shape({
      titulo: Yup.string().required(),
      corpo: Yup.string().required().max(550),
      veredito: Yup.boolean(),
      nota: Yup.number().required().max(5.0).min(0),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Erro na validação dos dados enviados',
      });
    }
    const { titulo, corpo, nota, veredito } = await Resenha.create(req.body);

    return res.json({
      veredito,
      titulo,
      corpo,
      nota,
    });
  }
}
export default new ControllerResenha();
