export interface CursorPagination<T> {
  items: T[];
  next_cursor?: string;
}
