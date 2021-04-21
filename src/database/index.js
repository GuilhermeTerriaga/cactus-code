import Sequelize from 'sequelize';

import Usuario from '../app/models/Usuario';
import Arquivo from '../app/models/Arquivo';
// import Resenha from '../app/models/Resenha';
// import Listas from '../app/models/Listas';

import databaseConfig from '../config/database';

const models = [Usuario, Arquivo];

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
