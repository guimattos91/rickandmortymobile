export type ResultType = {
  air_date: string | undefined;
  episode: string | undefined;
  name: string | undefined;
  id: number | null | undefined;
  pages: number;
};

export type EpisodeType = {
  air_date: string | undefined;
  episode: string | undefined;
  name: string | undefined;
  id: number | null | undefined;
  pages: number;

  info: {
    count: number;
    pages: number;
    next: string;
    prev: null;
  };
  results: ResultType[];
};
