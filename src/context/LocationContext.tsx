import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import Api from 'services/Api';

import { LocalType } from 'types/LocalType';

interface IContextProps {
  locations: LocalType[];
  location: LocalType | null;
  error: string | null;
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  fetchLocation: (id: number) => Promise<void>;
  fetchLocations: (page: number) => Promise<void>;
}

interface ILocationProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const LocationProvider: React.FC<ILocationProviderProps> = ({
  children,
}) => {
  const [locations, setLocations] = useState<LocalType[]>([]);
  const [location, setLocation] = useState<LocalType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchLocations = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await Api.get(`/location/?page=${page}`);
      // eslint-disable-next-line arrow-parens
      setLocations(prevLocations => [
        ...prevLocations,
        ...response.data.results,
      ]);
      setTotalPages(response.data.info.pages);
      setCurrentPage(page);
    } catch {
      setError('Error: Não achamos Nenhum Local');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchLocation = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Api.get(`/location/${id}`);
      setLocation(response.data);
    } catch {
      setError('Erro: Não achamos Nenhum Hotel ou Pousada');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          totalPages,
          locations,
          location,
          isLoading,
          error,
          currentPage,
          fetchLocation,
          fetchLocations,
        }),
        [
          totalPages,
          locations,
          location,
          isLoading,
          error,
          currentPage,
          fetchLocation,
          fetchLocations,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const useLocal = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useMyCustomHook must be within MyCustomProvider');
  }

  return context;
};
