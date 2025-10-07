import { createContext } from '../create-context';
import { environmentContext, type EnvironmentContext } from '../environment-context';

export const [EnvironmentContextProvider, useEnvironmentContext] =
  createContext<EnvironmentContext>({
    name: 'EnvironmentContext',
    hookName: 'useEnvironmentContext',
    providerName: '<EnvironmentProvider />',
    strict: false,
    defaultValue: environmentContext,
  });
