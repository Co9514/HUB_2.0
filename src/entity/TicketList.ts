import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { STUDENT } from './Student';
import { BUS_STOP } from './BusStop';
import { BUS_TIME } from './BusTime';
import { PENALTY } from './Penalty';

@Entity()
export class TICKET_LIST {
  @PrimaryGeneratedColumn()
  TICKET_ID!: number;

  @Column('char')
  STUDENT_ID!: string;

  @Column('integer')
  BUS_ID!: number;

  @Column('varchar')
  BUS_LINE_NAME!: string;

  @Column('varchar')
  START!: string;

  @Column('varchar')
  END!: string;

  @Column('date')
  TICKET_DATE!: Date;

  @Column('time')
  TICKET_TIME!: Date;

  @Column('datetime')
  RESERVATION_DATE!: Date;

  @Column('integer')
  SEAT!: number;

  @Column('varchar')
  BOARDING!: string;

  @Column('integer')
  PRICE!: number;
  // STUDENT - TICKET_LIST 연결
  @ManyToOne(
    type => STUDENT,
    student => student.ticket_lists,
  )
  @JoinColumn({ name: 'STUDENT_ID' })
  student!: STUDENT;

  // 아래 두개의 정의는 BUS_TIME - TICKET_LIST 연결
  @ManyToOne(
    type => BUS_TIME,
    bus_time => bus_time.ticket_lists_bustime,
  )
  @JoinColumn({ name: 'TICKET_TIME' }) // 상대편은 BUS_TIME
  bus_time_bustime!: BUS_TIME;

  @ManyToOne(
    type => BUS_TIME,
    bus_time => bus_time.ticket_lists_busid,
  )
  @JoinColumn({ name: 'BUS_ID' })
  bus_time_busid!: BUS_TIME;
  // PENALTY - TICKET_LIST 연결
  @OneToOne(
    type => PENALTY,
    penalty => penalty.ticket_id,
  )
  @JoinColumn({ name: 'TICKET_ID' })
  ticket_id!: PENALTY;
}
