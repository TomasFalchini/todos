import { z } from 'zod';

export const TodoPriorityEnum = z.enum(['low', 'medium', 'high']);
export type TodoPriority = z.infer<typeof TodoPriorityEnum>;

const TitleSchema = z
  .string()
  .min(1, 'El título es requerido')
  .max(200, 'El título es muy largo');

const ISODateString = z
  .string()
  .refine(val => !isNaN(Date.parse(val)), {
    message: 'Fecha inválida',
  })
  .transform(val => new Date(val));

const DescriptionSchema = z.string().optional();

const CompletedSchema = z.boolean().default(false);

export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: TitleSchema,
  description: DescriptionSchema,
  completed: CompletedSchema,
  priority: TodoPriorityEnum.default('medium'),
  date: ISODateString,
});

export type Todo = z.infer<typeof TodoSchema>;

export const GetAllTodosSchema = z.object({
  next_cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(100),
});

export type GetAllTodosInput = z.infer<typeof GetAllTodosSchema>;

export const GetTodoByIdSchema = z.object({
  id: z.string(),
});

export type GetTodoByIdInput = z.infer<typeof GetTodoByIdSchema>;

export const CreateTodoSchema = z.object({
  title: TitleSchema,
  description: DescriptionSchema,
  priority: TodoPriorityEnum.default('medium'),
  date: ISODateString.optional(),
});

export type CreateTodoInput = z.infer<typeof CreateTodoSchema>;

export const UpdateTodoSchema = z.object({
  title: TitleSchema.optional(),
  description: DescriptionSchema,
  completed: CompletedSchema.optional(),
  priority: TodoPriorityEnum.optional(),
  date: ISODateString.optional(),
});

export type UpdateTodoInput = z.infer<typeof UpdateTodoSchema>;

// Esquemas de respuesta de API
export const createApiResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T
) =>
  z.discriminatedUnion('success', [
    z.object({
      success: z.literal(true),
      message: z.string(),
      code: z.number(),
      data: dataSchema,
    }),
    z.object({
      success: z.literal(false),
      message: z.string(),
      code: z.number(),
      errors: z.array(z.string()).optional(),
      context: z.record(z.string(), z.any()).optional(),
    }),
  ]);

export const TodoApiResponseSchema = createApiResponseSchema(TodoSchema);
export type TodoApiResponse = z.infer<typeof TodoApiResponseSchema>;

export const EmptyApiResponseSchema = createApiResponseSchema(z.undefined());
export type EmptyApiResponse = z.infer<typeof EmptyApiResponseSchema>;

export const ApiResponseSchema = createApiResponseSchema(z.any());


export const ApiErrorSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  code: z.number(),
  errors: z.array(z.string()).optional(),
  context: z.record(z.string(), z.any()).optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;
