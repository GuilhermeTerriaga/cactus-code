import { Router } from 'express';
import multer from 'multer';
import ControllerArquivo from './app/controllers/ControllerArquivo';
import ControllerListas from './app/controllers/ControllerListas';
import ControllerResenha from './app/controllers/ControllerResenha';
import SessionController from './app/controllers/ControllerSessao';
// import das controladoras
import ControllerUsuario from './app/controllers/ControllerUsuario';
// import do middleware
import autMiddleware from './app/middlewares/autMiddleware';
import multerConfig from './config/multer';

const routes = new Router();

const upload = multer(multerConfig);

// rotas que não necessitam de autenticação
routes.post('/melhorTime', (req, res) => {
  return res.json({ 'melhor time': 'São Paulo Futebol Clube é claro!' });
});
routes.post('/users', ControllerUsuario.store); // se cadastrar
routes.post('/sessions', SessionController.store); // Logar

routes.get('/users', ControllerUsuario.index); // mostra todos os usuários do sistema
routes.post('/users/forgotpassword', ControllerUsuario.recover);
// a partir do use(autMiddleware) necessitará
routes.use(autMiddleware);
routes.post('/list', ControllerListas.store); // Guarda Listas

routes.post('/review', ControllerResenha.store); // Guarda Resenha

routes.put('/users', ControllerUsuario.update); // atualizar os proprios dados

routes.get('/users/show', ControllerUsuario.show); // visualiza apenas ele mesmo

routes.post('/users/search', ControllerUsuario.search); // visualiza apenas um, o que ele buscar

routes.post('/files', upload.single('arquivo'), ControllerArquivo.store);

// delete

module.exports = routes;
