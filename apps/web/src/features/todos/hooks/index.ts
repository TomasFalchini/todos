import { useTodosSDK } from '@/features/todos/services';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { Todo, CreateTodoInput } from '@shared/lib';
import { useState } from 'react';

/* export const useTodosPaginated = () => {
    const { getTodosPaginated } = useTodosSDK();

    return useInfiniteQuery({
        queryKey: ['todos'],
        queryFn: ({ pageParam }) => getTodosPaginated({ limit: 10, cursor: pageParam }),
        //Retorna undefined si no hay otro cursor para la siguiente pagina.
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        initialPageParam: undefined,
        select: (data) => {
            // Simular estructura de paginación para el backend actual
            const allTodos = data.pages.flatMap((page) => page.data || page.todos || page || []);
            return {
                todos: allTodos,
                nextCursor: null, // Sin paginación real por ahora
            }
        }
    });
}
 */

export const useTodosPaginated = () => {
  const { getTodosPaginated } = useTodosSDK();

  return useQuery({
    queryKey: ['todos'],
    queryFn: ({ pageParam }) =>
      getTodosPaginated({ limit: 10, cursor: undefined }),
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

  return useMutation({
    mutationFn: (todo: CreateTodoInput) => createNewTodo({ body: todo }),
  });
};

export const useUpdateTodoMutation = () => {
  const { updateTodo } = useTodosSDK();

  return useMutation({
    mutationFn: (todo: Todo) => updateTodo({ id: todo.id, body: todo }),
  });
};

export const useDeleteTodoMutation = () => {
  const { deleteTodo } = useTodosSDK();

  return useMutation({
    mutationFn: (id: string) => deleteTodo({ id }),
  });
};
