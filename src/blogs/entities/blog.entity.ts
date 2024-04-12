import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'blogs' })
@ObjectType()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column('text')
  @Field()
  description: string;

  @Column({ default: 'Unknown' })
  @Field({ defaultValue: 'Unknown' })
  author: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email?: string;

  @CreateDateColumn()
  @Field()
  createdDate: Date;

  @UpdateDateColumn()
  @Field()
  updatedDate: Date;
}
