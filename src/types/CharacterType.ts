export type CharactersType = {
  species: string | undefined;
  gender: string | undefined;
  status: string | undefined;
  image: string | undefined;
  name: string;
  id: number | null | undefined;
  pages: number;
  origin: { name: string | undefined; url: string | undefined };

  info: {
    count: number;
    pages: number;
    next: string;
    prev: null;
  };
  results: [
    {
      id: number;
      name: string;
      status: string;
      species: string;
      type: string;
      gender: string;
      origin: {
        name: string;
        url: string;
      };
      location: {
        name: string;
        url: string;
      };
      image: string;
      episode: string[];
      url: string;
      created: string;
    },
  ];
};
