import request from "../axios";
const articles = (data: object) =>
  request({ url: "articles", data, type: "get" });

export { articles };
