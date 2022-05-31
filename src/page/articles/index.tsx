import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./style/articles.sass";
import { useToken } from "../../context/tokenContext";
import { articles } from "../../api/articles";
import CustomTable from "../../component/table";
import Action from "./component/action";
import { Article, ResponseType, TableArticle } from "./type";
import Header from "../../component/header";
import SideBar from "../../component/sideBar";

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
      <Row>
        <SideBar />
        <Col md={9} lg={10} sm={11} style={{ paddingRight: 0, paddingLeft: 0 }}>
          <div className="articles-page-title">All Posts</div>
          <div className="articles-table">
            <CustomTable<TableArticle>
              columns={columns}
              data={convertData(data)}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Articles;
