import request from "../axios";
const articles = (data: object) =>
  request({ url: "articles", data, type: "get" });

const addArticles = (data: object) => request({ url: "articles", data });

const editArticles = (extendUrl: string, data: object) =>
  request({ url: "articles/" + extendUrl, data, type: "put" });

const deletArticles = (extendUrl: string) =>
  request({ url: "articles/" + extendUrl, type: "delete" });

const getArticle = (extendUrl: string) =>
  request({ url: "articles/" + extendUrl, type: "get" });

const tags = () => request({ url: "tags", type: "get" });

export { articles, tags, addArticles, editArticles, getArticle, deletArticles };
