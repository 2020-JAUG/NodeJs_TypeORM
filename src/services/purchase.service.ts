import {PurchaseEntity} from "../entities/purchase.entity";
import {DeleteResult, UpdateResult} from "typeorm";
import {BaseService} from "../config/base.service";
import {AppDataSource} from "../config/data.source";
import {PurchaseDTO} from "../entities/dto/purchase.dto";

export class PurchaseService extends BaseService<PurchaseEntity> {

    protected repository = AppDataSource.getRepository(PurchaseEntity);

    constructor() {
        super(PurchaseEntity);
    }

    async createPurchase(body: PurchaseDTO): Promise<PurchaseEntity> {
        return (await this.execRepository).save(body);
    }

    async findAllPurchase(): Promise<PurchaseEntity[]> {
        return (await this.execRepository).find();
    }

    async findPurchaseById(id: string): Promise<PurchaseEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async updatePurchase(id: string, infoUpdate: PurchaseDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    async deletePurchase(id: string): Promise<DeleteResult> {
        return (await this.repository).softDelete(id);
    }
}