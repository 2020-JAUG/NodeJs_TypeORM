import { DeleteResult, UpdateResult } from "typeorm";
import { CustomerEntity } from "../entities/customer.entity";
import { BaseService } from "../config/base.service";
import { CustomerDto } from "../entities/dto/customer.dto";
import { AppDataSource } from "../config/data.source";
import { UserService } from "./user.service";
import { RoleType } from "../entities/dto/user.dto";

export class CustomerService extends BaseService<CustomerEntity> {

    protected repository = AppDataSource.getRepository(CustomerEntity);

    constructor(private readonly userService: UserService = new UserService()) {
        super(CustomerEntity)
    }

    async createCustomer(body: CustomerDto): Promise<CustomerEntity | null> {

        const createCustomer = (await this.execRepository).create(body);
        //const createCustomer = new CustomerEntity()
        //createCustomer.user = body.user;
        //createCustomer.identity_card = body.identity_card;

        const user = await this.userService.findUserById(createCustomer.user.id);

        if (user) {
            await this.userService.updateUser(user.id, {
                ...user,
                role: RoleType.CUSTOMER,
            });

            return (await this.execRepository).save(body);
        }
        return null;
    }

    async findAllCustomers(): Promise<CustomerEntity[]> {
        return (await this.execRepository).find();
    }

    async findCustomerById(id: string): Promise<CustomerEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async updateCustomer(id: string, infoUpdate: CustomerDto): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    async deleteCustomer(id: string): Promise<DeleteResult> {
        return (await this.repository).softDelete(id);
    }
}