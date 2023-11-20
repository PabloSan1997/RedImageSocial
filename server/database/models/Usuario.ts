import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Imagen } from './Imagen';


@Entity()
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id_usuario: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, unique: true })
    user_name: string;

    @Column({ length: 10000 })
    password: string;

    @Column({ length: 100 })
    rol: string;

    @Column({length:5000})
    url_perfil:string;

    @OneToMany(() => Imagen, image => image.usuario)
    imagenes: Imagen[];
}