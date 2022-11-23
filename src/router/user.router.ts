import { BaseRouter } from "./base.router";
import { UserController } from "../controllers/user.controller";
import { Request, Response } from 'express';
import { UserMiddleware } from "../middlewares/user.middleware";

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
    constructor() {
        super(UserController, UserMiddleware);
    }

    routes(): void {
        this.router.post('/new-user',
            (req, res, next) => [this.middleware.userValidator(req, res, next)],
            (req: Request, res: Response) => this.controller.createUser(req, res)
        );
        this.router.post('/users', (req: Request, res: Response) => this.controller.getUsers(req, res));
        this.router.post('/user/:id', (req: Request, res: Response) => this.controller.findUserById(req, res));
        this.router.post('/user-relationship/:id', (req: Request, res: Response) => this.controller.findUserWithRelation(req, res));
        this.router.put('/update-user/:id', (req: Request, res: Response) => this.controller.updateUSer(req, res));
        this.router.delete('/delete-user/:id',
            this.middleware.passAuth("jwt"),//Aqui indicamos la strategy que queremos usar para poder recibir el token por header y verificar su tiene o no permisos
            (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
            (req: Request, res: Response) => this.controller.deleteUser(req, res)
        );

    }
}