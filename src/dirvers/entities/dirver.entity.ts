import { Entity, BeforeInsert, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Team } from 'src/teams/entities/team.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  driver_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  driver_number: string;

  @Column({ type: 'date'})
  dob : Date;

  @Column()
  height : number;

  @Column()
  weight : number;

  @Column()
  country: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  registered_date: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  update_date: Date;

  @ManyToOne(() => Team, team => team.drivers) // Many-to-One relationship with Team entity
  @JoinColumn({ name: 'team_id' }) // Foreign key column in the database
  team: Team;

}