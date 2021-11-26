import Sequelize, { Model } from 'sequelize';

class Filme extends Model {
  static init(sequelize) {
    super.init(
      { tmdbId: Sequelize.STRING },
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
