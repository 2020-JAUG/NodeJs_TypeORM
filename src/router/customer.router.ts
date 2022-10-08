import { Request, Response } from "express";
import {BaseRouter} from "./base.router";
import {CustomerController} from "../controllers/customer.controller";

export class CustomerRouter extends BaseRouter<CustomerController, void> {

    constructor() {
        super(CustomerController);
    }

    routes(): void {
        this.router.post('/new-customer', (req: Request, res: Response) => this.controller.createCustomer(req, res));
        this.router.post('/customers', (req: Request, res: Response) => this.controller.getCustomers(req, res));
        this.router.post('/customer/:id', (req: Request, res: Response) => this.controller.findCustomerById(req, res));
        this.router.put('/update-customer/:id', (req: Request, res: Response) => this.controller.updateCustomer(req, res));
        this.router.delete('/delete-customer/:id', (req: Request, res: Response) => this.controller.deleteCustomer(req, res));
    }
}