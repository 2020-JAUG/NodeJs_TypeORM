
import { Request } from "express"
import { UserEntity } from "../../entities/user.entity"


export interface IGetUserAuthInfoRequest extends Request {
    user: UserEntity // or any other type
}