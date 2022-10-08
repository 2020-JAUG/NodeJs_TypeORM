import {Router} from "express";

//Esta clase trabaja genericamente por eso tenemos el generico tipo T => (controller) y U => (middleware)
export class BaseRouter<T, U> {
    public router: Router;
    public controller: T

    constructor( TController: { new (): T } ) { // Aqui indicamos que retorna una nueva instancia de tipo T
        this.router = Router();
        this.controller = new TController();
        this.routes();
    }

    routes(){}
}