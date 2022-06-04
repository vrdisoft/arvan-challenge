import { useNavigate, createSearchParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch } from "../../context/articleDispatcherContext";
import { clearAlertMessage } from "../../stateManager/actionCreator";
import "./style/table.scss";

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
        <Pagination.Prev
          disabled={activePage === 1}
          onClick={() => {
            pageItemClickHandle(activePage - 1);
          }}
        />
        {makePage()}
        <Pagination.Next
          disabled={pageNumber === activePage}
          onClick={() => {
            pageItemClickHandle(activePage + 1);
          }}
        />
      </Pagination>
    </div>
  );
}

export default TablePagination;
