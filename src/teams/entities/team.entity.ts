import { Entity,OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Driver } from 'src/dirvers/entities/dirver.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  team_id: number;

  @Column({ unique: true })
  team_name: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  registered_date: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  update_date: Date;

  @OneToMany(() => Driver, driver => driver.team) // One-to-Many relationship with Driver entity
  drivers: Driver[];

}