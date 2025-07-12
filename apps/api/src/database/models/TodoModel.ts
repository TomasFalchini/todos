import { Todo } from '@todos/shared';

//Ver si aca va algo mas

export interface TodoDbModel extends Todo {
  created_at: Date;
  updated_at: Date;
}
