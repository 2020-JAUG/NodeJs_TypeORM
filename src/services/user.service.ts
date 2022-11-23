import * as bcrypt from "bcrypt";
import { BaseService } from "../config/base.service";
import { UserEntity } from "../entities/user.entity";
import { RoleType, UserDTO } from "../entities/dto/user.dto";
import { DeleteResult, UpdateResult } from "typeorm";
import { AppDataSource } from "../config/data.source";

export class UserService extends BaseService<UserEntity> {

    protected repository = AppDataSource.getRepository(UserEntity);

    constructor() {
        super(UserEntity);
    }

    async createUser(body: UserDTO): Promise<UserEntity> {

        const newUser = await this.repository.create(body);

        const hashPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashPassword;
        return (await this.execRepository).save(newUser);
    }

    async findAllUser(): Promise<UserEntity[]> {
        return (await this.execRepository).find();
    }

    async findUserById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.customer', 'customer')
            .where({ id })
            .getOne();
    }

    async findUserWithRelation(id: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.customer', 'customer')
            .where({ id })
            .getOne();
    }

    async findByUsername(user_name: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where({ user_name })
            .getOne();
    }

    async findUserByEmail(email: string): Promise<UserEntity | null> {
        return await (await this.execRepository)
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where({ email })
            .getOne();
    }

    async findUserWithRole(id: string, role: RoleType): Promise<UserEntity | null> {
        const user = (await this.execRepository)
            .createQueryBuilder('user')
            .where({ id })
            .andWhere({ role })
            .getOne();

        return user;
    }

    async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    async deleteUser(id: string): Promise<DeleteResult> {
        return await this.repository.softDelete(id);
    }

}