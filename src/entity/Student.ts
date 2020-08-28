import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { TICKET_LIST } from './TicketList';
import { PENALTY } from './Penalty';
import { SHUTTLE_QR } from './ShuttleQR';

@Entity()
export class STUDENT {
  @PrimaryGeneratedColumn()
  STUDENT_ID!: string;

  @Column()
  STUDENT_NAME!: string;

  @Column()
  STUDENT_DEPT!: string;

  @Column()
  STUDENT_SCHYR!: string;

  @Column()
  ACCEPT!: string;

  @Column('datetime')
  PENALTY_DATE!: Date;

  @Column()
  PENALTY_COUNT!: number;

  @Column()
  PENALTY_END!: Date;
  // STUDENT - TICKET_LIST 연결
  @OneToMany(
    type => TICKET_LIST,
    ticket_list => ticket_list.student,
  )
  @JoinColumn({ name: 'STUDENT_ID' })
  ticket_lists!: TICKET_LIST[];

  // STUDENT - PENALTY 연결
  @OneToMany(
    type => PENALTY,
    penalty => penalty.student,
  )
  @JoinColumn({ name: 'STUDENT_ID' })
  penaltys!: PENALTY[];

  //STUDET - SHUTTLE_QR 연결
  @OneToMany(
    type => SHUTTLE_QR,
    shuttle_qr => shuttle_qr.student,
  )
  @JoinColumn({ name: 'STUDENT_ID' })
  shuttle_qr!: SHUTTLE_QR[];
}
