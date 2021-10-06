import Sequelize, { Model } from 'sequelize';

class Resenha extends Model {
  static init(sequelize) {
    super.init(
      {
        dados_listas: Sequelize.JSON,
      },
      {
        sequelize,
      }
    );
    return this; // NUNCA ESQUECER O RETURN SEU ANIMAL
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  }
}
export default Resenha;
