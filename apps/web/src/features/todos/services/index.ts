import { useBackend } from '@/services';
import { AxiosInstance } from 'axios';
import {
  CreateTodoInput,
  EmptyApiResponse,
  Todo,
  TodoApiResponse,
  UpdateTodoInput,
} from '@shared/lib';

const baseUrl = '/todos';

export const todosApiSdk = (apiConsumer: AxiosInstance) => {
  return {
    createNewTodo: async ({ body }: { body: CreateTodoInput }): Promise<void> => {
      await apiConsumer.post<EmptyApiResponse>(`${baseUrl}`, {
        ...body,
      });
      return;
    },
    getTodosPaginated: async ({
      limit,
      next_cursor,
    }: {
      limit: number;
      next_cursor?: string;
    }): Promise<{ items: Todo[]; next_cursor: string }> => {
      const res = await apiConsumer.get<{
        success: boolean;
        data: { items: Todo[]; next_cursor: string };
      }>(`${baseUrl}`, { params: { limit, next_cursor } });

      if (!res.data.success) {
        throw new Error('Error al cargar todos');
      }

      return res.data.data;
    },
    getTodoById: async ({ id }: { id: string }): Promise<Todo> => {
      const res = await apiConsumer.get<TodoApiResponse>(`${baseUrl}/${id}`);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      return res.data.data;
    },
    updateTodo: async ({
      id,
      body,
    }: {
      id: string;
      body: UpdateTodoInput;
    }): Promise<void> => {
      const res = await apiConsumer.put(`${baseUrl}/${id}`, {
        ...body,
      });
      return res.data;
    },
    deleteTodo: async ({ id }: { id: string }): Promise<void> => {
      const res = await apiConsumer.delete(`${baseUrl}/${id}`);
      return res.data;
    },
  };
};

export const useTodosSDK = () => {
  const apiConsumer = useBackend();
  return todosApiSdk(apiConsumer);
};
