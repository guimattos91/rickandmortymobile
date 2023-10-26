import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import Api from 'services/Api';

import { CharactersType } from 'types/CharacterType';

interface IContextProps {
  characters: CharactersType[];
  character: CharactersType | null;
  error: string | null;
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  fetchCharacter: (id: number | string) => Promise<void>;
  fetchCharacters: (page: number) => Promise<void>;
}

interface ICharactersProviderProps {
  children: React.ReactNode;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const CharactersProvider: React.FC<ICharactersProviderProps> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<CharactersType[]>([]);
  const [character, setCharacter] = useState<CharactersType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchCharacters = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await Api.get(`/character/?page=${page}`);
      // eslint-disable-next-line prettier/prettier
      setCharacters((prevCharacters) => [
        ...prevCharacters,
        ...response.data.results,
      ]);
      setTotalPages(response.data.info.pages);
      setCurrentPage(page);
    } catch {
      setError('Error: Can not find Characters');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // const fetchNextPage = useCallback(() => {
  //   // eslint-disable-next-line prettier/prettier
  //   if (!isFetching) setCurrentPage((prev) => prev + 1);
  // }, [isFetching]);

  // const loadMoreCharacters = useCallback(() => {
  //   if (currentPage < totalPages && !isFetching) {
  //     setIsFetching(true);
  //     fetchCharacters(currentPage + 1).then(() => setIsFetching(false));
  //   }
  // }, [currentPage, totalPages, isFetching, fetchCharacters]);

  const fetchCharacter = useCallback(async (id: number | string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Api.get(`/character/${id}`);
      setCharacter(response.data);
    } catch {
      setError('Erro: Não achamos Nenhum Personagem');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          totalPages,
          characters,
          character,
          isLoading,
          error,
          currentPage,
          fetchCharacter,
          fetchCharacters,
        }),
        [
          totalPages,
          characters,
          character,
          isLoading,
          error,
          currentPage,
          fetchCharacter,
          fetchCharacters,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const useCharacters = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useMyCustomHook must be within MyCustomProvider');
  }

  return context;
};
