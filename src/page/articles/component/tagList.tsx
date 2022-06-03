import { Article } from "../type";
function TagList(article: Article) {
  return (
    <>
      <div style={{ overflowY: "auto", maxHeight: "35px" }}>
        {article.tagList.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    </>
  );
}

export default TagList;
