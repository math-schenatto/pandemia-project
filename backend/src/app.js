import express from 'express';
import routes from './routes';
import cors from 'cors';
import './database';

class App {
  constructor(){
    this.server = express();
    this.middleares();
    this.routes();
  }
  middleares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;