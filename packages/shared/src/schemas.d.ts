import { z } from 'zod';
export declare const TodoPriorityEnum: z.ZodEnum<["low", "medium", "high"]>;
export type TodoPriority = z.infer<typeof TodoPriorityEnum>;
export declare const TodoSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    completed: z.ZodDefault<z.ZodBoolean>;
    priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high"]>>;
    date: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    date: Date;
    description?: string | undefined;
}, {
    id: string;
    title: string;
    date: string;
    description?: string | undefined;
    completed?: boolean | undefined;
    priority?: "low" | "medium" | "high" | undefined;
}>;
export type Todo = z.infer<typeof TodoSchema>;
export declare const GetAllTodosSchema: z.ZodObject<{
    next_cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    limit: number;
    next_cursor?: string | undefined;
}, {
    limit: number;
    next_cursor?: string | undefined;
}>;
export type GetAllTodosInput = z.infer<typeof GetAllTodosSchema>;
export declare const GetTodoByIdSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type GetTodoByIdInput = z.infer<typeof GetTodoByIdSchema>;
export declare const CreateTodoSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high"]>>;
    date: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    priority: "low" | "medium" | "high";
    description?: string | undefined;
    date?: Date | undefined;
}, {
    title: string;
    description?: string | undefined;
    priority?: "low" | "medium" | "high" | undefined;
    date?: string | undefined;
}>;
export type CreateTodoInput = z.infer<typeof CreateTodoSchema>;
export declare const UpdateTodoSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    completed: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    priority: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
    date: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
    completed?: boolean | undefined;
    priority?: "low" | "medium" | "high" | undefined;
    date?: Date | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    completed?: boolean | undefined;
    priority?: "low" | "medium" | "high" | undefined;
    date?: string | undefined;
}>;
export type UpdateTodoInput = z.infer<typeof UpdateTodoSchema>;
export declare const TodoFiltersSchema: z.ZodObject<{
    completed: z.ZodOptional<z.ZodBoolean>;
    priority: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    completed?: boolean | undefined;
    priority?: "low" | "medium" | "high" | undefined;
    search?: string | undefined;
}, {
    completed?: boolean | undefined;
    priority?: "low" | "medium" | "high" | undefined;
    search?: string | undefined;
}>;
export type TodoFilters = z.infer<typeof TodoFiltersSchema>;
export declare const createApiResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodDiscriminatedUnion<"success", [z.ZodObject<{
    success: z.ZodLiteral<true>;
    message: z.ZodString;
    code: z.ZodNumber;
    data: T;
}, "strip", z.ZodTypeAny, { [k_1 in keyof z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    success: z.ZodLiteral<true>;
    message: z.ZodString;
    code: z.ZodNumber;
    data: T;
}>, "code" | "message" | "success" | (undefined extends T["_output"] ? never : "data")>]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    success: z.ZodLiteral<true>;
    message: z.ZodString;
    code: z.ZodNumber;
    data: T;
}>, "code" | "message" | "success" | (undefined extends T["_output"] ? never : "data")>[k_1]; }, { [k_2 in keyof z.baseObjectInputType<{
    success: z.ZodLiteral<true>;
    message: z.ZodString;
    code: z.ZodNumber;
    data: T;
}>]: z.baseObjectInputType<{
    success: z.ZodLiteral<true>;
    message: z.ZodString;
    code: z.ZodNumber;
    data: T;
}>[k_2]; }>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    message: z.ZodString;
    code: z.ZodNumber;
    errors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    code: number;
    message: string;
    success: false;
    errors?: string[] | undefined;
    context?: Record<string, any> | undefined;
}, {
    code: number;
    message: string;
    success: false;
    errors?: string[] | undefined;
    context?: Record<string, any> | undefined;
}>]>;
export declare const TodoApiResponseSchema: z.ZodDiscriminatedUnion<"success", [z.ZodObject<{
    success: z.ZodLiteral<true>;
    message: z.ZodString;
    code: z.ZodNumber;
    data: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        completed: z.ZodDefault<z.ZodBoolean>;
        priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high"]>>;
        date: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        completed: boolean;
        priority: "low" | "medium" | "high";
        date: Date;
        description?: string | undefined;
    }, {
        id: string;
        title: string;
        date: string;
        description?: string | undefined;
        completed?: boolean | undefined;
        priority?: "low" | "medium" | "high" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    code: number;
    message: string;
    success: true;
    data: {
        id: string;
        title: string;
        completed: boolean;
        priority: "low" | "medium" | "high";
        date: Date;
        description?: string | undefined;
    };
}, {
    code: number;
    message: string;
    success: true;
    data: {
        id: string;
        title: string;
        date: string;
        description?: string | undefined;
        completed?: boolean | undefined;
        priority?: "low" | "medium" | "high" | undefined;
    };
}>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    message: z.ZodString;
    code: z.ZodNumber;
    errors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    code: number;
    message: string;
    success: false;
    errors?: string[] | undefined;
    context?: Record<string, any> | undefined;
}, {
    code: number;
    message: string;
    success: false;
    errors?: string[] | undefined;
    context?: Record<string, any> | undefined;
}>]>;
export type TodoApiResponse = z.infer<typeof TodoApiResponseSchema>;
export declare const EmptyApiResponseSchema: z.ZodDiscriminatedUnion<"success", [z.ZodObject<{
    success: z.ZodLiteral<true>;
    message: z.ZodString;
    code: z.ZodNumber;
    data: z.ZodUndefined;
}, "strip", z.ZodTypeAny, {
    code: number;
    message: string;
    success: true;
    data?: undefined;
}, {
    code: number;
    message: string;
    success: true;
    data?: undefined;
}>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    message: z.ZodString;
    code: z.ZodNumber;
    errors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    code: number;
    message: string;
    success: false;
    errors?: string[] | undefined;
    context?: Record<string, any> | undefined;
}, {
    code: number;
    message: string;
    success: false;
    errors?: string[] | undefined;
    context?: Record<string, any> | undefined;
}>]>;
export type EmptyApiResponse = z.infer<typeof EmptyApiResponseSchema>;
export declare const ApiResponseSchema: z.ZodDiscriminatedUnion<"success", [z.ZodObject<{
    success: z.ZodLiteral<true>;
    message: z.ZodString;
    code: z.ZodNumber;
    data: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    code: number;
    message: string;
    success: true;
    data?: any;
}, {
    code: number;
    message: string;
    success: true;
    data?: any;
}>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    message: z.ZodString;
    code: z.ZodNumber;
    errors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    code: number;
    message: string;
    success: false;
    errors?: string[] | undefined;
    context?: Record<string, any> | undefined;
}, {
    code: number;
    message: string;
    success: false;
    errors?: string[] | undefined;
    context?: Record<string, any> | undefined;
}>]>;
export type ApiResponse<T = any> = z.infer<typeof ApiResponseSchema>;
export declare const ApiErrorSchema: z.ZodObject<{
    success: z.ZodLiteral<false>;
    message: z.ZodString;
    code: z.ZodNumber;
    errors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    code: number;
    message: string;
    success: false;
    errors?: string[] | undefined;
    context?: Record<string, any> | undefined;
}, {
    code: number;
    message: string;
    success: false;
    errors?: string[] | undefined;
    context?: Record<string, any> | undefined;
}>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
//# sourceMappingURL=schemas.d.ts.map