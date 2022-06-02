import { useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./style/newArticle.sass";
import { useToken } from "../../context/tokenContext";
import { tags, getArticle } from "../../api/articles";
import Header from "../../component/header";
import SideBar from "../../component/sideBar";
import Tag, { TagType } from "./component/tag";
import ArticleForm from "./component/articleForm";
import { sortTagList } from "./util";
import { Article } from "../articles/type";

const intiArticle: Article = {
  title: "",
  body: "",
  description: "",
  slug: "",
  author: {
    bio: "",
    username: "",
    image: "",
    following: false,
  },
  tagList: [],
  createdAt: new Date(),
};

function NewArticle() {
  const location = useLocation();
  const [tagList, setTagList] = useState<TagType[]>([]);
  const [isNewArticlePage, setIsNewArticlePage] = useState<boolean>(true);
  const [slue, setSlue] = useState<string>("");
  const [article, setArticle] = useState<Article>(intiArticle);
  const [searchParams, setSearchParams] = useSearchParams();

  const getTags = () => {
    return tags().then((res) => {
      const items = res.data.tags.map((item: string) => {
        return { name: item, isChecked: false };
      });
      const tagItems = sortTagList(items);
      setTagList(tagItems);
      return tagItems;
    });
  };

  const setArticleTags = (articleTags: string[], tagItems: TagType[]) => {
    let items = [...tagItems];
    articleTags.forEach((name) => {
      const index = items.findIndex((item) => item.name === name);
      if (index < 0) {
        items = [...items, { name, isChecked: true }];
      } else {
        items[index].isChecked = true;
      }
      setTagList(sortTagList(items));
    });
  };

  const getEditArticle = (isNewArticle: boolean, tagItems: TagType[]) => {
    if (!isNewArticle) {
      const currentSlue = searchParams.get("slug") ?? "";
      getArticle(currentSlue)
        .then((res) => {
          const currentArticle = res?.data?.article;
          setArticle(currentArticle);
          setSlue(currentSlue);
          setArticleTags(currentArticle.tagList, tagItems);
        })
        .catch((err) => {
          console.log(err.data.errors);
        });
    }
  };

  useEffect(() => {
    const isNewArticle =
      location.pathname === "/articles/create" ? true : false;
    setIsNewArticlePage(isNewArticle);
    getTags().then((tagItems) => {
      getEditArticle(isNewArticle, tagItems);
    });
  }, [location.pathname]);

  const onChangeTagHandler = (item: TagType, index: number) => {
    const items = [...tagList];
    items[index].isChecked = !item.isChecked;
    setTagList(items);
  };

  const onAddTagHandler = (name: string) => {
    const index = tagList.findIndex((item) => item.name === name);
    if (index < 0) {
      const items = [...tagList, { name, isChecked: true }];
      setTagList(sortTagList(items));
    }
  };

  return (
    <>
      <Header />
      <Row>
        <SideBar />
        <Col md={9} lg={10} sm={11} style={{ paddingRight: 0, paddingLeft: 0 }}>
          <div className="new-article-page-title">
            {isNewArticlePage ? "New Article" : "Edit Article"}
          </div>
          <div className="new-article-continer">
            <Row>
              <ArticleForm
                tagList={tagList}
                isNewArticlePage={isNewArticlePage}
                slue={slue}
                article={article}
              />
              <Tag
                tagList={tagList}
                onChange={onChangeTagHandler}
                addTag={onAddTagHandler}
              />
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default NewArticle;