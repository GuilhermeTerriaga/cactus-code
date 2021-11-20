import Sequelize from 'sequelize';
import Arquivo from '../app/models/Arquivo';
import Filme from '../app/models/Filme';
import Lista from '../app/models/Lista';
import Resenha from '../app/models/Resenha';
import Usuario from '../app/models/Usuario';
import databaseConfig from '../config/database';

const models = [Usuario, Lista, Arquivo, Resenha, Filme];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
