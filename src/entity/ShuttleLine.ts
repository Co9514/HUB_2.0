import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { SHUTTLE_STOP } from './ShuttleStop';

@Entity()
export class SHUTTLE_LINE {
  @Column()
  @Index('SHUTTLE_LINE_IDX')
  IDX!: number;

  @PrimaryColumn('varchar')
  CODE!: string;

  @PrimaryColumn('varchar')
  LINE_NAME!: string;

  @PrimaryColumn('integer')
  SEQUENCE!: number;

  @Column('integer')
  SUTTLE_STOP_ID!: number;

  //SHUTTLE_LINE(*) - SHUTTLE_STOP(1)
  @ManyToOne(
    type => SHUTTLE_STOP,
    shuttle_stop => shuttle_stop.shuttle_line,
  )
  @JoinColumn({ name: 'SHUTTLE_STOP_ID' })
  shuttle_stop!: SHUTTLE_STOP;
}
