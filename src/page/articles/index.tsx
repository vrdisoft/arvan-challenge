import { lazy } from "react";

const LazyArticles = lazy(() => import("./articles"));

export default LazyArticles;
