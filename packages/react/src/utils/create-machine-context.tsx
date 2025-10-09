import { createContext, useContext } from 'react';

export interface CreateMachineContextResult<P, R> {
  MachineProvider: (p: React.ProviderProps<P>) => React.JSX.Element;
  ServiceProvider: (p: React.ProviderProps<R>) => React.JSX.Element;
  Consumer: (p: React.ConsumerProps<R>) => React.JSX.Element;
  useService: () => R;
}

export function createMachineContext<P, R>(useHook: (p: P) => R): CreateMachineContextResult<P, R> {
  const Context = createContext<R | null>(null);
  return {
    MachineProvider: ({ value, children }) => {
      return <Context.Provider value={useHook(value)}>{children}</Context.Provider>;
    },
    ServiceProvider: ({ value, children }) => {
      return <Context.Provider value={value}>{children}</Context.Provider>;
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
