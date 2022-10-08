import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { AppDataSource } from "./data.source";

export abstract class ConfigServer {

    protected constructor() {
        //Aqui le pasamos el path recibido para configurar nuestra variable de entorno
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        dotenv.config({ //Esta es una configuracion por defecto para pasarle por path la variable de entorno
            path: nodeNameEnv
        });
    }

    //Lee la variable de entorno y define
    public getEnvironment(key: string): string | undefined {
        return process.env[key]; //Return this process.env['PORT'] <=== lo lee de esta manera
    }

    //Lee la variable de entorno y define un numero
    public getNumberEnv(key: string): number {
        return Number(this.getEnvironment(key));
    }

    //Obetenemos la variable de entorno para saber en que entorno de trabajo me encuentro
    //Si no se define el entorno, por defecto es development
    public get nodeEnv(): string {
        //return this.getEnvironment('NODE_ENV') || 'development';
        return this.getEnvironment("NODE_ENV")?.trim() || "";
    }

    //Leemos un path u otro dependiendo de las variables e entorno, production o development
    public createPathEnv(path: string): string {
        //por defecto los archivos de entorno son .env
        const arrEnv: string[] = ['env'];

        //Si el entorno es production o development le agregamos .production o .development
        if (path.length > 0) {
            const stringToArray = path.split('.');// Creamos el array
            //arrEnv.push(path);
            //arrEnv.push(stringToArray[0]);
            arrEnv.unshift(...stringToArray);// Se lo pasamos a la const
        }

        //Concatenamos el path con el nombre del archivo de entorno
        return '.' + arrEnv.join('.');
    }

    //Getter to access at connection and his environments
    get initConnect(): Promise<DataSource> {
        return AppDataSource.initialize();
    }

}