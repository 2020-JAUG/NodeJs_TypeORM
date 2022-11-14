import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { CustomerService } from "../services/customer.service";
import { HttpResponse } from "../helpers/http.response";

export class CustomerController {

    constructor(
        private readonly customerService: CustomerService = new CustomerService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async createCustomer(req: Request, res: Response) {
        try {
            const data = await this.customerService.createCustomer(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async getCustomers(req: Request, res: Response) {
        try {
            const data = await this.customerService.findAllCustomers();
            data.length === 0 ? this.httpResponse.NotFound(res, 'Data not found!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async findCustomerById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.customerService.findCustomerById(id);
            data === null ? this.httpResponse.NotFound(res, 'Customer not found!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async updateCustomer(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: UpdateResult = await this.customerService.updateCustomer(id, req.body);
            data.affected === 0 ? this.httpResponse.NotFound(res, 'Customer cannot be updated!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async deleteCustomer(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.customerService.deleteCustomer(id);
            data.affected === 0 ? this.httpResponse.NotFound(res, 'Customer cannot be deleted!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }
}