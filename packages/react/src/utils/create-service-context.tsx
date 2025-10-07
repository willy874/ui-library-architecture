import { createContext, useContext } from 'react';

interface CreateServiceContextResult<P, R> {
  Provider: (p: React.ProviderProps<P>) => React.JSX.Element;
  Consumer: (p: React.ConsumerProps<R>) => React.JSX.Element;
  useService: () => R;
}

export function createServiceContext<P, R>(useHook: (p: P) => R): CreateServiceContextResult<P, R> {
  const Context = createContext<R | null>(null);
  return {
    Provider: ({ value, children }) => {
      return <Context.Provider value={useHook(value)}>{children}</Context.Provider>;
    },
    Consumer: ({ children }) => {
      return (
        <Context.Consumer>
          {(value) => {
            if (value) {
              return children(value);
            }
            throw new Error('Component must be wrapped with Provider');
          }}
        </Context.Consumer>
      );
    },
    useService: () => {
      const context = useContext(Context);
      if (!context) {
        throw new Error('Component must be wrapped with Provider');
      }
      return context;
    },
  };
}
