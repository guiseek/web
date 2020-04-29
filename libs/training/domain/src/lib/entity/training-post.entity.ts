import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('posts')
export class TrainingPost {
  @ObjectIdColumn()
  _id:       ObjectID;

  @Column({
    type: 'string'
  })
  body:      string;

  @Column({
    type: 'string'
  })
  permalink: string;

  @Column({
    type: 'string'
  })
  author:    string;

  @Column({
    type: 'string'
  })
  title:     string;

  @Column({
    type: 'simple-array'
  })
  tags:      string[];

  @Column({
    type: 'json'
  })
  comments:  Comment[];

  @Column({
    type: 'date'
  })
  date:      DateClass;
}

export interface Comment {
  body:   string;
  email:  string;
  author: string;
}

export interface DateClass {
  $date: string;
}
