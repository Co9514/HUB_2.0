import {
    Entity,
    PrimaryGeneratedColumn,
    Column
  } from 'typeorm';
import { isArray } from 'util';

  @Entity()
  export class NOTICE {
    @PrimaryGeneratedColumn()
    IDX!: number;
  
    @Column('varchar')
    TITLE!: string;
  
    @Column('varchar')
    CONTENT!: string;
  
    @Column('datetime')
    TIME!: Date;

    @Column('varchar')
    IMAGE! : string;

    @Column('varchar')
    FILE! : string;
  }