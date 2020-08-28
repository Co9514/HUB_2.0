import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { STUDENT } from './Student';
import { TICKET_LIST } from './TicketList';

@Entity()
export class PENALTY {
  @Column()
  STUDENT_ID!: string;

  @PrimaryColumn()
  TICKET_ID!: number;

  @Column()
  @Index('IDX_penalty')
  IDX!: number;
  // STUDENT - PENALTY 연결
  @ManyToOne(
    type => STUDENT,
    student => student.penaltys,
  )
  @JoinColumn({ name: 'STUDENT_ID' })
  student!: STUDENT[];

  // TICKET_LIST - PENALTY 연결
  @OneToOne(
    type => TICKET_LIST,
    ticket_list => ticket_list.ticket_id,
  )
  @JoinColumn({ name: 'TICKET_ID' })
  ticket_id!: TICKET_LIST;
}
