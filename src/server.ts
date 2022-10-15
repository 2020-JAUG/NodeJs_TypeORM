import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {DataSource} from "typeorm";
import {ConfigServer} from "./config/config";
import {UserRouter} from "./router/user.router";
import {ProductRouter} from "./router/product.router";
import {CustomerRouter} from "./router/customer.router";
import {CategoryRouter} from "./router/category.router";
import {PurchaseRouter} from "./router/purchase.router";

export class Server extends ConfigServer {

    public app: express.Application = express();
    //Con la palabra reservado this accedemos al metodo getNumberEnv gracias a la herencia y la palabra reservada super
    private port: number = this.getNumberEnv("PORT");// Nombre de la varibale de entorno que tenemos en el .env

    constructor() {

        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        let ignore = this.dbConnection();
        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.app.use('/api', this.routers());
        this.listen();
    }

    routers(): express.Router[] {
        return [
            new UserRouter().router,
            new ProductRouter().router,
            new CustomerRouter().router,
            new CategoryRouter().router,
            new PurchaseRouter().router
        ]
    }

    async dbConnection(): Promise< DataSource | void> {
        return this.initConnect
            .then(() => {
                console.log("Connect Success!");
            })
            .catch((err) => {
                console.error(err);
            });
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        })
    }
}

new Server();