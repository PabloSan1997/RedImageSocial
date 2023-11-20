import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Usuario } from './Usuario';


@Entity()
export class Imagen{
    @PrimaryGeneratedColumn('uuid')
    id_imagen:string;

    @Column({length:100})
    title:string;

    @Column({length:5000})
    description:string;

    @Column({length:5000})
    url_image:string;

    @ManyToOne(()=>Usuario, usuario=>usuario.imagenes)
    usuario:Usuario;

    @CreateDateColumn()
    creadedAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;
}