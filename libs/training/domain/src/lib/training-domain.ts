export function trainingDomain(): string {
  return 'training-domain';
}

export interface TrainingPost {
  _id:       ID;
  body:      string;
  permalink: string;
  author:    string;
  title:     string;
  tags:      string[];
  comments:  Comment[];
  date:      DateClass;
}

export interface ID {
  $oid: string;
}

export interface Comment {
  body:   string;
  email:  string;
  author: string;
}

export interface DateClass {
  $date: string;
}
