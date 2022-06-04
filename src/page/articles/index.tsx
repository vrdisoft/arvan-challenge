import { lazy, Suspense } from "react";

const Articles = lazy(() => import("./articles"));

function LazyArticles() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Articles />
    </Suspense>
  );
}

export default LazyArticles;
