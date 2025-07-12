import { useBackend } from '@/services';
import { AxiosInstance } from 'axios';
import {
  CreateTodo,
  EmptyApiResponse,
  Todo,
  TodoApiResponse,
} from '@shared/lib';
import { uuidv4 } from 'zod/v4';

const baseUrl = '/todos';

const dummyTodos: Todo[] = [
  {
    id: uuidv4().toString(),
    title: 'Configurar proyecto',
    description: 'Configurar el monorepo con React y Express',
    completed: true,
    priority: 'high',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T14:30:00Z'),
  },
  {
    id: uuidv4().toString(),
    title: 'Implementar API',
    description: 'Crear endpoints para CRUD de todos',
    completed: false,
    priority: 'medium',
    createdAt: new Date('2024-01-16T09:00:00Z'),
    updatedAt: new Date('2024-01-16T09:00:00Z'),
  },
  {
    id: uuidv4().toString(),
    title: 'Crear interfaz de usuario',
    description:
      'Diseñar UI con AntDesign y implementar componentes reutilizables',
    completed: false,
    priority: 'medium',
    createdAt: new Date('2024-01-17T11:30:00Z'),
    updatedAt: new Date('2024-01-17T11:30:00Z'),
  },
  {
    id: uuidv4().toString(),
    title: 'Revisar documentación',
    description: 'Actualizar README y documentar las APIs',
    completed: true,
    priority: 'low',
    createdAt: new Date('2024-01-18T08:15:00Z'),
    updatedAt: new Date('2024-01-18T16:45:00Z'),
  },
  {
    id: uuidv4().toString(),
    title: 'Implementar autenticación',
    description: 'Agregar sistema de login y registro de usuarios con JWT',
    completed: false,
    priority: 'high',
    createdAt: new Date('2024-01-19T13:20:00Z'),
    updatedAt: new Date('2024-01-19T13:20:00Z'),
  },
  {
    id: uuidv4().toString(),
    title: 'Optimizar rendimiento',
    description:
      'Implementar lazy loading y memoización en componentes críticos',
    completed: false,
    priority: 'medium',
    createdAt: new Date('2024-01-20T07:45:00Z'),
    updatedAt: new Date('2024-01-20T07:45:00Z'),
  },
  {
    id: uuidv4().toString(),
    title: 'Escribir tests unitarios',
    description: 'Cubrir al menos 80% del código con tests automatizados',
    completed: false,
    priority: 'high',
    createdAt: new Date('2024-01-21T10:30:00Z'),
    updatedAt: new Date('2024-01-21T10:30:00Z'),
  },
  {
    id: uuidv4().toString(),
    title: 'Configurar CI/CD',
    description:
      'Implementar pipeline de integración continua con GitHub Actions',
    completed: true,
    priority: 'medium',
    createdAt: new Date('2024-01-22T15:00:00Z'),
    updatedAt: new Date('2024-01-22T18:30:00Z'),
  },
  {
    id: uuidv4().toString(),
    title: 'Diseñar base de datos',
    description: 'Crear esquemas para usuarios, todos y categorías',
    completed: false,
    priority: 'high',
    createdAt: new Date('2024-01-23T09:15:00Z'),
    updatedAt: new Date('2024-01-23T09:15:00Z'),
  },
  {
    id: uuidv4().toString(),
    title: 'Implementar notificaciones',
    description: 'Sistema de notificaciones push para recordatorios',
    completed: false,
    priority: 'low',
    createdAt: new Date('2024-01-24T12:00:00Z'),
    updatedAt: new Date('2024-01-24T12:00:00Z'),
  },
];

export const todosApiSdk = (apiConsumer: AxiosInstance) => {
  return {
    createNewTodo: async ({ body }: { body: CreateTodo }): Promise<void> => {
      await apiConsumer.post<EmptyApiResponse>(`${baseUrl}`, {
        ...body,
      });
      return;
    },
    //TODO: En realidad esto devuelve todo paginado!
    getTodosPaginated: async ({
      limit,
      cursor,
    }: {
      limit: number;
      cursor?: string;
    }): Promise<Todo[]> => {
      /* const res = await apiConsumer.get<{ success: boolean; data: Todo[] }>(`${baseUrl}`, {params: {limit, cursor}});
       
        if (!res.data.success) {
            throw new Error('Error al cargar todos');
        }

 */
      // return res.data.data;
      return dummyTodos;
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
      body: any;
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
