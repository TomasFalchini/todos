import React, { ReactNode, useState } from 'react';
import { ViewContext, ViewType } from './ViewContext';

interface ViewProviderProps {
  children: ReactNode;
}

export const ViewProvider: React.FC<ViewProviderProps> = ({ children }) => {
  const [viewType, setViewType] = useState<ViewType>('list');

  return (
    <ViewContext.Provider value={{ viewType, setViewType }}>
      {children}
    </ViewContext.Provider>
  );
};
