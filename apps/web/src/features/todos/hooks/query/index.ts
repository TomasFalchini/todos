import { useTodosSDK } from '@/features/todos/services';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { Todo, CreateTodoInput, UpdateTodoInput } from '@shared/lib';
import { queryClient, useMessage } from '@/hooks';

export const useTodosInfinitePaginated = () => {
  const { getTodosPaginated } = useTodosSDK();

  return useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: ({ pageParam }) =>
      getTodosPaginated({ limit: 10, next_cursor: pageParam }),
    getNextPageParam: (lastPage: { next_cursor: string; items: Todo[] }) =>
      lastPage?.next_cursor ?? undefined,
    initialPageParam: undefined,
  });
};

export const useGetTodoByIdQuery = (id: string) => {
  const { getTodoById } = useTodosSDK();

  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => getTodoById({ id }),
  });
};

export const useCreateTodoMutation = () => {
  const { createNewTodo } = useTodosSDK();

  const notification = useMessage();

  return useMutation({
    mutationFn: (todo: CreateTodoInput) => createNewTodo({ body: todo }),
    onSuccess: () => {
      notification.success('Tarea creada correctamente');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodoMutation = () => {
  const { updateTodo } = useTodosSDK();
  const notification = useMessage();

  return useMutation({
    mutationFn: ({ body, id }: { body: UpdateTodoInput; id: string }) =>
      updateTodo({ id, body }),
    onSuccess: (_, { id }) => {
      notification.success('Tarea actualizada correctamente');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todo', id] });
    },
  });
};

export const useDeleteTodoMutation = () => {
  const { deleteTodo } = useTodosSDK();
  const notification = useMessage();
  return useMutation({
    mutationFn: (id: string) => deleteTodo({ id }),
    onSuccess: () => {
      notification.success('Tarea eliminada correctamente');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
