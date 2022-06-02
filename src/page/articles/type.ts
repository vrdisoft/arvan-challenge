export type Author = {
  following: boolean;
  username: string;
  image: string;
  bio: string;
};

export type Article = {
  slug: string;
  author: Author;
  body: string;
  createdAt: Date;
  description: string;
  tagList: string[];
  title: string;
};

export type ResponseType = {
  data: {
    articles: Article[];
    articlesCount: number;
  }
};

export type TableArticle = {
  id: number;
  username: string;
  body: string;
  createdAt: string;
  description: string;
  tagList: string[];
  title: string;
};
