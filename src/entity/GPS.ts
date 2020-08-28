import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Double
  } from 'typeorm';

  @Entity()
  export class GPS {
    @PrimaryGeneratedColumn()
    IDX!: number;
  
    @Column('varchar')
    TID!: string;
  
    @Column('double')
    LATITUDE!: Double;
  
    @Column('double')
    LONGITUDE!: Double;
  
    @Column('float')
    SPEED!: Number;

    @Column('date')
    DATE!: Date;

    @Column('time')
    TIME!: Date;

    @Column('varchar')
    CLASSIFY! : string;

    @Column('varchar')
    DIRECTION! : string;

    @Column('varchar')
    BUS_NUMBER! : string;
  }