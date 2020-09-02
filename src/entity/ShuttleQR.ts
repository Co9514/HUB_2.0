import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { STUDENT } from './Student';
@Entity()
export class SHUTTLE_QR {
  @PrimaryGeneratedColumn()
  IDX!: number;

  @Column('char')
  STUDENT_ID!: string;

  @Column('varchar')
  SHUTTLE_STOP_NAME!: string;
  // 등교/하교 구분
  @Column('varchar')
  STATE!: string;
  // 셔틀/통학 구분
  @Column('varchar')
  CLASSIFY!: string;
  // 방향
  @Column('varchar')
  DIRECTION!: string;
  // 몇호차인지
  @Column('int')
  BUS_NUMBER!: number;
  // 차량번호
  @Column('varchar')
  CAR_NUMBER!: string;

  @Column('date')
  DATE!: Date;

  @Column('time')
  TIME!: Date;

  // SHUTTLE_QR(*) - STUDENT(1) 연결되어 있음
  @ManyToOne(
    type => STUDENT,
    student => student.shuttle_qr,
  )
  @JoinColumn({ name: 'STUDENT_ID' })
  student!: STUDENT[];
}
