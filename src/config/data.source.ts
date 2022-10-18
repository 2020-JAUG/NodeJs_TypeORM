import {DataSource, DataSourceOptions} from "typeorm";
import * as dotenv from 'dotenv';
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {database} from "../mysql/constants";

//Lee las variables de entorno
dotenv.config({
    path: process.env.NODE_ENV !== undefined ? `.${process.env.NODE_ENV.trim()}.env`
        : ".env"
})

const Config: DataSourceOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.MYSQL_USER || database.user,
    password: process.env.MYSQL_PASSWORD || database.password,
    database: process.env.MYSQL_DATABASE || database.database,
    //extra: { connectionLimit: 10},
    entities: [__dirname + "/../**/*.entity{.ts,.js}"], //Para leer las entidades del proyecto y buscar en las carpetas los archivos que tengan la extension .ts .js
    migrations: [__dirname + "/../migrations/*{.ts,.js}"],
    synchronize: true,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(), //Para almacenar en la base de datos los nombres en snake_case
};


export const AppDataSource: DataSource = new DataSource(Config);