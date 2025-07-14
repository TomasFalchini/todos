import { Todo } from '@shared/lib';

//Ver si aca va algo mas

export interface TodoDbModel extends Todo {
  created_at: Date;
  updated_at: Date;
}
