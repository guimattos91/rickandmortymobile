import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import Api from 'services/Api';

import { EpisodeType } from 'types/EpisodeType';

interface IContextProps {
  episodes: EpisodeType[];
  error: string | null;
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  fetchEpisodes: (page: number) => Promise<void>;
}

interface IEpisodesProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const EpisodesProvider: React.FC<IEpisodesProviderProps> = ({
  children,
}) => {
  const [episodes, setEpisodes] = useState<EpisodeType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchEpisodes = useCallback(async (page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
    setError(null);

    try {
      const response = await Api.get(`/episode/?page=${page}`);
      // eslint-disable-next-line prettier/prettier
      setEpisodes((prevEpisodes) => [
        ...prevEpisodes,
        ...response.data.results,
      ]);
      setTotalPages(response.data.info.pages);
      setCurrentPage(page);
    } catch {
      setError('Error: Can not load episodes');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          totalPages,
          episodes,
          isLoading,
          error,
          currentPage,
          fetchEpisodes,
        }),
        [totalPages, episodes, isLoading, error, currentPage, fetchEpisodes],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const useEpisodes = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useMyCustomHook must be within MyCustomProvider');
  }

  return context;
};
