import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  password: string;

  @Column()
  login: string;

  @VersionColumn({ type: 'int', default: 1 })
  version: number; // integer number, increments on update

  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      from: (value) => new Date(value).getTime(),
      to: (value) => value,
    },
  })
  createdAt: number; // timestamp of creation

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: {
      from: (value) => new Date(value).getTime(),
      to: (value) => value,
    },
  })
  updatedAt: number; // timestamp of last update
}
