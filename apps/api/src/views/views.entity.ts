import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class View {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movie: number;

  @Column()
  user_uuid: string;
}
