import {EntityTarget, ObjectLiteral, Repository} from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

/**
 * con esta clase podemos realizar el CRUD
 */
export class BaseService<T extends BaseEntity> extends ConfigServer { //Es de tipo generico xq ejecutara cada entidad

    public execRepository: Promise<Repository<T>>

    constructor(private getEntity: EntityTarget<T>) { // Metodo privado para llamar la entidad
        super();

        this.execRepository = this.initRepository(getEntity);
    }

    async initRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Promise<Repository<T>> {

        const getConnect = await this.initConnect;
        return getConnect.getRepository(entity); // Aqui le pasamos el repository que recibe la funcion
    }
}