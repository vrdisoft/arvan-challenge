import { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSearchParams } from "react-router-dom";

import "./style/articles.scss";
import { articles } from "../../api/articles";
import CustomTable from "../../component/table";
import Header from "../../component/header";
import SideBar from "../../component/sideBar";
import ArticleAlert from "./component/alert";
import TagList from "./component/tagList";
import { Article, ResponseType, TableArticle } from "./type";
import { useAppState } from "../../context/articleStateContext";
import PageTitle from "../../component/pageTitle";

const PAGE_LIMIT = 10;

function Articles() {
  const [data, setData] = useState<TableArticle[]>([]);
  const [articlesCount, setArticlesCount] = useState<number>(40);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const appState = useAppState();

  const convertData = (
    articlesData: Article[],
    offset: number
  ): TableArticle[] => {
    return articlesData.map((item, index) => {
      return {
        id: index + (offset - 1) * PAGE_LIMIT + 1,
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
        slug: item.slug,
      };
    });
  };
  const getData = async () => {
    const activePage = Number(searchParams.get("page")) || 1;
    const offset = (activePage - 1) * PAGE_LIMIT;
    try {
      const response: ResponseType = await articles({
        params: { limit: PAGE_LIMIT, offset },
      });
      const tableData = convertData(response?.data?.articles, activePage);
      setData(tableData);
      //setArticlesCount(res?.data?.articlesCount);
      setCurrentPage(activePage);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [appState.reload, searchParams.get("page")]);

  const columns = useRef([
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
      formatter: TagList,
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
  ]).current;

  return (
    <>
      <Header />
      <Row id="articles-row">
        <SideBar />
        <Col md={12} lg={10} sm={12} id="articles-continer">
          <div className="articles-header-continer">
            <PageTitle />
            <div className="articles-alert-continer">
              {!!appState.alertMessage && (
                <ArticleAlert message={appState.alertMessage} />
              )}
            </div>
          </div>
          <div className="articles-table">
            <CustomTable<TableArticle>
              columns={columns}
              data={data}
              pageNumber={Math.ceil(articlesCount / PAGE_LIMIT)}
              activePage={currentPage}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Articles;
