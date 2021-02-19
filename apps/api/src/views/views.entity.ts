import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['movie', 'user_uuid'])
export class View {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'movie' })
  movie: number;

  @Column({ name: 'user_uuid' })
  user_uuid: string;
}
