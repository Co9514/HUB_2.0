import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BUS_LINE } from './BusLine';
import { TICKET_LIST } from './TicketList';

@Entity()
export class BUS_TIME {
  @PrimaryColumn()
  BUS_ID!: number;

  @PrimaryColumn('varchar')
  WEEK_OF_DAY!: string;

  @PrimaryColumn('time')
  BUS_TIME!: Date;

  @PrimaryColumn()
  IDX_BUS_LINE!: number;

  // BUS_LINE - BUS_TIME 연결
  @ManyToOne(
    type => BUS_LINE,
    bus_line => bus_line.bus_times,
  )
  @JoinColumn({ name: 'IDX_BUS_LINE' })
  bus_line!: BUS_LINE;

  // 아래 두 개의 정의는 BUS_TIME - TICKET_LIST 연결
  @OneToMany(
    type => TICKET_LIST,
    ticket_list => ticket_list.bus_time_bustime,
  )
  @JoinColumn({ name: 'BUS_TIME' })
  ticket_lists_bustime!: TICKET_LIST[];

  @OneToMany(
    type => TICKET_LIST,
    ticket_list => ticket_list.bus_time_busid,
  )
  @JoinColumn({ name: 'BUS_ID' })
  ticket_lists_busid!: TICKET_LIST[];
}
