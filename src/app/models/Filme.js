import Sequelize, { Model } from 'sequelize';

class Filme extends Model {
  static init(sequelize) {
    super.init(
      { nome: Sequelize.STRING, url: Sequelize.STRING },
      { sequelize, tableName: 'filmes' }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Lista, {
      through: 'lista_filme',
      foreignKey: 'filme_id',
    });
  }
}
export default Filme;
