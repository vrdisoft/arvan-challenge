import { lazy, Suspense } from "react";

const NewArticle = lazy(() => import("./newArticle"));

function LazyNewArticle() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewArticle />
    </Suspense>
  );
}
export default LazyNewArticle;
