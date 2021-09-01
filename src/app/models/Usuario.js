import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';
// classe sera usada no ORM
class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        apelido: Sequelize.STRING,
        email: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        hash_senha: Sequelize.STRING,
        emailSecundario: Sequelize.STRING,
        personagemFav: Sequelize.STRING,
        dtNascimento: Sequelize.DATEONLY,
      },
      {
        sequelize,
      }
    );

    // antes de ssalvar, criptografa a senha do usuário
    this.addHook('beforeSave', async (usuario) => {
      if (usuario.senha) {
        usuario.hash_senha = await bcrypt.hash(usuario.senha, 8);
      }
    });
    return this;
  }

  // associação entre a foto e o usuário
  static associate(models) {
    this.belongsTo(models.Arquivo, { foreignKey: 'arquivo_id', as: 'avatar' });
    // this.belongsTo(models.Listas, { foreignKey: 'lista_id', as: 'lista' });
  }
  // adcionar a associação entre usuario e genero cinematografico

  // verifica se a password digitada bate com o hash
  verificarSenha(senha) {
    return bcrypt.compare(senha, this.hash_senha);
  }
}
export default Usuario;
