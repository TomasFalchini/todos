import { createContext, useContext } from 'react';

export type ViewType = 'sticky' | 'list';

interface ViewContextType {
  viewType: ViewType;
  setViewType: (type: ViewType) => void;
}

export const ViewContext = createContext<ViewContextType | undefined>(
  undefined
);

export const useView = (): ViewContextType => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView must be used within a ViewProvider');
  }
  return context;
};
