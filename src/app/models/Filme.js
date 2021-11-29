import Sequelize, { Model } from 'sequelize';

class Filme extends Model {
  static init(sequelize) {
    super.init(
      { tmdbId: Sequelize.STRING },
      { sequelize, tableName: 'filmes' }
    );
    return this;
  }
}
export default Filme;
