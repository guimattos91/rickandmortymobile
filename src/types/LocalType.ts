export type LocalType = {
  dimension: string;
  type: string;
  name: string | undefined;
  id: number | undefined;
  pages: number;

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
      type: string;
      dimension: string;
      residents: string[];
      url: string;
      created: string;
    },
  ];
};
