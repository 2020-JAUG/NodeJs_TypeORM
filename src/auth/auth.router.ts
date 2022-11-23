import { SharedMiddleware } from "../helpers/middlewares/shared.middleware";
import { BaseRouter } from "../router/base.router";
import { AuthController } from "./controllers/auth.controller";
import { IGetUserAuthInfoRequest } from "./controllers/auth.IUserRequest"
export class AuthRouter extends BaseRouter<AuthController, SharedMiddleware> {

    constructor() {
        super(AuthController, SharedMiddleware);
    }

    routes(): void {
        this.router.post("/login", this.middleware.passAuth("login"), (req: IGetUserAuthInfoRequest, res) => this.controller.login(req, res));
    }
}