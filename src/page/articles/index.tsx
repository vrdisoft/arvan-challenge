import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "../login/style/login.sass";
import { useToken } from "../../context/tokenContext";
import { articles } from "../../api/articles";
import CustomTable from "../../component/table";
import Action from "./component/action";
import { Article, ResponseType, TableArticle } from "./type";
import Header from "../../component/header";

function Articles() {
  const [data, setData] = useState<Article[]>([]);
  useEffect(() => {
    articles({ limit: 10, offset: 0 }).then((res: ResponseType) => {
      setData(res?.data?.articles);
    });
  }, []);

  const convertData = (articlesData: Article[]): TableArticle[] => {
    return articlesData.map((item, index) => {
      return {
        id: index + 1,
        title: item.title,
        body: item.body,
        createdAt: new Date(item.createdAt).toLocaleDateString([], {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }),
        description: item.description,
        username: item.author.username,
        tagList: item.tagList,
      };
    });
  };

  const columns = [
    {
      dataField: "id",
      text: "#",
    },
    {
      dataField: "title",
      text: "Title",
    },
    {
      dataField: "username",
      text: "Author",
    },
    {
      dataField: "tagList",
      text: "Tags",
    },
    {
      dataField: "body",
      text: "Excerpt",
      maxlength: true,
    },
    {
      dataField: "createdAt",
      text: "Created",
    },
    {
      dataField: "action",
      text: "",
      formatter: Action,
    },
  ];

  return (
    <>
      <Header username="saeed" />
      <CustomTable<TableArticle> columns={columns} data={convertData(data)} />
    </>
  );
}

export default Articles;
