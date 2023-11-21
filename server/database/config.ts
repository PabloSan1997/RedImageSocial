import {DataSource} from 'typeorm';
import { variables } from '../utilities/variables';
import { Imagen } from './models/Imagen';
import { Usuario } from './models/Usuario';

export const AppDataSource = new DataSource({
    type:'postgres',
    url:variables.url_database,
    logging:true,
    synchronize:true,
    entities:[Imagen, Usuario],
    migrations:[],
    ssl:{
        rejectUnauthorized:false
    }
});

export async function probarBaseDeDatos(){
    await AppDataSource.initialize();
    console.log('Conextado a la base de datos');
}