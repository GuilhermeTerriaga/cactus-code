import Sequelize, { Model } from 'sequelize';

class Lista extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: Sequelize.STRING,
        corpo: Sequelize.TEXT,
      },
      {
        sequelize,
        tableName: 'listas',
      }
    );
    return this; // NUNCA ESQUECER O RETURN SEU ANIMAL
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  }
}
export default Lista;
