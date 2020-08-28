import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { SHUTTLE_LINE } from './ShuttleLine';

@Entity()
export class SHUTTLE_STOP {
  @PrimaryColumn()
  SHUTTLE_STOP_ID!: number;

  @Column('varchar')
  EN_NAME!: string;

  @Column('varchar')
  KOR_NAME!: string;

  @Column()
  DETAIL!: string;

  @Column('double')
  LATITUDE!: number;

  @Column('double')
  LONGITUDE!: number;

  //SHUTTLE_STOP(1) - SHUTTLE_LINE(*)
  @OneToMany(
    type => SHUTTLE_LINE,
    shuttle_line => shuttle_line.shuttle_stop,
  )
  @JoinColumn({ name: 'SHUTTLE_STOP_ID' })
  shuttle_line!: SHUTTLE_LINE[];
}
