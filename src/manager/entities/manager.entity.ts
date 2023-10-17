import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { IsEmail, isNotEmpty } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Manager{
  @PrimaryGeneratedColumn()
  manager_id: number;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Column({length : 255})
  password: string;

}