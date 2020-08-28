import {
  Entity,
  PrimaryColumn,
  JoinColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { BUS_STOP } from './BusStop';
import { BUS_TIME } from './BusTime';
@Entity()
export class BUS_LINE {
  @PrimaryColumn()//고유키
  IDX_BUS_LINE!: number;

  @PrimaryColumn()//고유키
  BUS_LINE_ID!: number;

  @PrimaryColumn()//고유키
  LINE_SEQUENCE!: number;

  @Column()
  BUS_STOP_ID!: number;

  // BUS_STOP - BUS_LINE 연결
  //관계맵핑
  @ManyToOne(
    type => BUS_STOP,
    bus_stop => bus_stop.bus_lines,
  )
  @JoinColumn({ name: 'BUS_STOP_NAME' })
  bus_stop!: BUS_STOP;

  // BUS_TIME - BUS_LINE 연결
  @OneToMany(
    type => BUS_TIME,
    bus_time => bus_time.bus_line
  )
  @JoinColumn({name : "IDX_BUS_LINE"})
  bus_times!: BUS_TIME[];
}
