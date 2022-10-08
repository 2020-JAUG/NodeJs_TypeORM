import {DeleteResult, UpdateResult} from "typeorm";
import {CustomerEntity} from "../entities/customer.entity";
import {BaseService} from "../config/base.service";
import {CustomerDto} from "../entities/dto/customer.dto";
import {AppDataSource} from "../config/data.source";

export class CustomerService extends BaseService<CustomerEntity> {

    protected repository = AppDataSource.getRepository(CustomerEntity);

    constructor() {
        super(CustomerEntity)
    }

    async createCustomer(body: CustomerDto): Promise<CustomerEntity> {
        return ( await this.execRepository).save(body);
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