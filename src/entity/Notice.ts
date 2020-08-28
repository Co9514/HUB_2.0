import {
    Entity,
    PrimaryGeneratedColumn,
    Column
  } from 'typeorm';

  @Entity()
  export class NOTICE {
    @PrimaryGeneratedColumn()
    IDX!: number;
  
    @Column('varchar')
    TITLE!: string;
  
    @Column('varchar')
    CONTENTS!: string;
  
    @Column('datetime')
    TIME!: Date;

    @Column('varchar')
    IMAGE! : string[];

    @Column('varchar')
    FILE! : string[];
  }