import {BaseRouter} from "../router/router";
import {UserController} from "./controllers/user.controller";
import { Request, Response } from 'express';

export class UserRouter extends BaseRouter<UserController, void> {
    constructor() {
        super(UserController);
    }

    routes(): void {
        this.router.post('/new-user', (req: Request, res: Response) => this.controller.createUser(req, res) );
        this.router.post('/users', (req: Request, res: Response) => this.controller.getUsers(req, res) );
        this.router.post('/user/:id', (req: Request, res: Response ) => this.controller.findUserById(req, res) );
        this.router.post('/user-relationship/:id', (req: Request, res: Response ) => this.controller.findUserWithRelation(req, res) );
        this.router.put('/update-user/:id', (req: Request, res: Response ) => this.controller.updateUSer(req, res) );
        this.router.delete('/delete-user/:id', (req: Request, res: Response ) => this.controller.deleteUser(req, res) );

    }
}