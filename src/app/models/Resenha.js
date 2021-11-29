import Sequelize, { Model } from 'sequelize';

class Resenha extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: Sequelize.STRING,
        corpo: Sequelize.STRING(550),
        veredito: Sequelize.BOOLEAN,
        nota: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    this.belongsTo(models.Filme, { foreignKey: 'filmes_id', as: 'filme' });
  }
}
export default Resenha;
