import Login from "../page/login";
import LazyArticles from "../page/articles";
import LazyNewArticle from "../page/newArticle";
import * as paths from "./paths";

const routes = [
  {
    title: "Login",
    path: paths.LOGIN,
    component: Login,
    side: false,
    mustBeLogin: false,
  },
  {
    title: "Register",
    path: paths.REGISTER,
    component: Login,
    side: false,
    mustBeLogin: false,
  },
  {
    title: "All Posts",
    path: paths.ARTICLES,
    component: LazyArticles,
    side: true,
    sideTitle: "All Articles",
    mustBeLogin: true,
  },
  {
    title: "All Posts",
    path: paths.ARTICLES_PAGE,
    component: LazyArticles,
    side: false,
    sideTitle: "All Articles",
    mustBeLogin: true,
  },
  {
    title: "New Article",
    path: paths.ARTICLES_CREATE,
    component: LazyNewArticle,
    side: true,
    sideTitle: "New Articles",
    mustBeLogin: true,
  },
  {
    title: "Edit Article",
    path: paths.ARTICLES_EDIT,
    component: LazyNewArticle,
    side: false,
    sideTitle: "Edit Articles",
    mustBeLogin: true,
  },
];
export default routes;
