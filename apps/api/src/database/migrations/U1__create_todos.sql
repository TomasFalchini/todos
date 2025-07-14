DROP INDEX IF EXISTS idx_todos_cursor_pagination;

DROP TRIGGER IF EXISTS update_todos_updated_at ON todos;

DROP TABLE IF EXISTS todos;

DROP FUNCTION IF EXISTS update_updated_at_column();

DROP TYPE IF EXISTS todo_priority;

DROP EXTENSION IF EXISTS "uuid-ossp";
