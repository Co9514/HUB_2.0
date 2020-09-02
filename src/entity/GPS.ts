import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Double,
    PrimaryColumn
  } from 'typeorm';

  @Entity()
  export class GPS {
    @PrimaryColumn('varchar')
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

    @Column('int')
    BUS_NUMBER! : number;

    @Column('varchar')
    CAR_NUMBER! : string;
  }