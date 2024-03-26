export interface User {
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmation?: string;
  };

export interface Film {
    id?: string;
    imdbId?: string;
    title?: string;
    releaseDate?: string;
    trailerLink: string;
    genres?: string[];
    poster: string;
    backdrops: string[];
    reviewIds?: Reviews[];
    watchList?: User[];
  };

export interface Reviews {
    id?: string;
    user?: User[];
    body?: string;
    dateCreated?: string;
  };

  export interface WatchList{
    film_id?: Film[];
    user_id?: User[]

  }

  export interface Rating {
    film_rate?: Film[];
    user?: User[];
    rate: any;
  }
  