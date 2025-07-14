import React from 'react';
import { Flex } from 'antd';
import { useView } from '@/context/view/ViewContext';
import { ErrorInPage, LoaderSkeleton } from '@/components/molecules';
import { useTodosInfinitePaginated } from '../../hooks';
import { EmptyCard } from '../atoms';
import { GridView, ListView } from '../molecules';
import { CommonAppButton } from '@/components/atoms';

export const TodosList: React.FC = () => {
  const { viewType } = useView();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTodosInfinitePaginated();

  const todos = data?.pages.flatMap(page => page.items) ?? [];

  if (isLoading) return <LoaderSkeleton />;
  if (isError)
    return (
      <ErrorInPage
        title="Error al cargar tareas"
        message={error?.message || 'Hubo un problema al cargar las tareas'}
      />
    );
  if (todos.length === 0)
    return (
      <EmptyCard
        title="No tienes tareas aún"
        description="¡Crea tu primera tarea!"
      />
    );

  return (
    <Flex vertical>
      {viewType === 'sticky' ? (
        <GridView todos={todos} />
      ) : (
        <ListView todos={todos} />
      )}
      {hasNextPage && (
        <CommonAppButton
          title="Cargar más"
          className="w-full lg:w-1/2 lg:mx-auto mt-4"
          onClick={() => fetchNextPage()}
          loading={isFetchingNextPage}
        />
      )}
    </Flex>
  );
};
