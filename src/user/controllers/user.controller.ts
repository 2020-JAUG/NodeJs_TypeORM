import { Request, Response} from "express";
import {UserService} from "../services/user.service";
import {HttpResponse} from "../../shared/response/http.response";
import {DeleteResult, UpdateResult} from "typeorm";

export class UserController {

    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    async createUser(req: Request, res: Response) {
        try {
            const data = await this.userService.createUser(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async getUsers( req: Request, res: Response ) {
        try {
            const data = await this.userService.findAllUser();
            data.length === 0 ? this.httpResponse.NotFound(res, 'Data not found!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async findUserWithRelation(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.userService.findUserById(id);
            data === null ? this.httpResponse.NotFound(res, 'User not found!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async findUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.userService.findUserById(id);
            data === null ? this.httpResponse.NotFound(res, 'User not found!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async updateUSer(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: UpdateResult = await this.userService.updateUser(id, req.body);
            data.affected === 0 ? this.httpResponse.NotFound(res, 'User cannot be updated!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.userService.deleteUser(id);
            data.affected === 0 ? this.httpResponse.NotFound(res, 'User cannot be deleted!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

}
