import React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch } from "../../context/articleDispatcherContext";
import { clearAlertMessage } from "../../stateManager/actionCreator";
import "./style/table.sass";

function TablePagination({
  pageNumber,
  activePage,
}: {
  pageNumber: number;
  activePage: number;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageItemClickHandle = (number: number) => {
    dispatch(clearAlertMessage());
    if (number !== 1) {
      navigate(
        {
          pathname: "/articles/page",
          search: createSearchParams({
            page: number.toString(),
          }).toString(),
        },
        { replace: true }
      );
    } else {
      navigate(`/articles`, { replace: true });
    }
  };

  const makePage = () => {
    const items = [];
    for (let number = 1; number <= pageNumber; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={() => {
            pageItemClickHandle(number);
          }}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div className="pagination-continer">
      <Pagination>
        <Pagination.Prev />
        {makePage()}
        <Pagination.Next />
      </Pagination>
    </div>
  );
}

export default TablePagination;