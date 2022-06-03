import { lazy } from "react";

const LazyNewArticle = lazy(() => import("./newArticle"));

export default LazyNewArticle;
