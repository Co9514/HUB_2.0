import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  JoinColumn,
  Generated,
} from 'typeorm';
import { BUS_LINE } from './BusLine';

@Entity()
export class BUS_STOP {
  @Generated()
  IDX!: number;

  @PrimaryColumn()
  BUS_STOP_NAME!: string;

  @Column('varchar')
  BOARDING_LOCATION!: number;

  @Column('double')
  LATITUDE!: number;

  @Column('double')
  LONGITUDE!: number;

  @Column('integer')
  C_PRICE!: number;

  @Column('integer')
  A_PRICE!: number;

  @Column('varchar')
  CODE!: string;

  // BUS_STOP - BUS_LINE이 연결되어 있음
  @OneToMany(
    type => BUS_LINE,
    bus_line => bus_line.bus_stop,
  )
  @JoinColumn({ name: 'BUS_STOP_NAME' })
  bus_lines!: BUS_LINE[];
}
