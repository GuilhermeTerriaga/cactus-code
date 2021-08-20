import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

import './database';

class App {
  constructor() {
    // cria o servidor
    this.server = express();
    // sobe os middlewares
    this.middlewares();
    // confugura as rotas
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: 'http://localhost:3000' }));
    this.server.use(
      '/arquivos',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
