import Arquivo from '../models/Arquivo';
import Usuario from '../models/Usuario';

class ControllerArquivo {
  async store(req, res) {
    const { originalname: nome, filename: caminho } = req.file;

    const arquivo = await Arquivo.create({
      nome,
      caminho,
    });
    const usuario = await Usuario.findByPk(req.usuarioId);
    const arq = { arquivo_id: arquivo.id };
    await usuario.update(arq);
    return res.json(arquivo);
  }
}

export default new ControllerArquivo();
