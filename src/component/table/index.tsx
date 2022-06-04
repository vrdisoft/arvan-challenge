import Table from "react-bootstrap/Table";
import "./style/table.scss";
import Action from "./action";
import Pagination from "./pagination";

type ColumnsType = {
  dataField: string;
  text: string;
  formatter?: any;
  maxlength?: boolean;
};

interface TableProps<T> {
  columns: ColumnsType[];
  data: T[];
  pageNumber: number;
  activePage: number;
}

function CustomTable<T>({
  columns,
  data,
  pageNumber,
  activePage,
}: TableProps<T>) {
  return (
    <>
      <Table responsive borderless>
        <thead>
          <tr style={{ backgroundColor: "#eceeef", color: "#55595c" }}>
            {columns.map((item, index) => (
              <th key={item.dataField}>{item.text}</th>
            ))}
            <th key={"action"}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((dataItem, index) => (
            <tr key={index} style={{ borderBottom: "solid 1px #ddd" }}>
              {columns.map((colItem, colIndex) => (
                <>
                  {!colItem.formatter && (
                    <td
                      key={index.toString() + colIndex.toString()}
                      style={{ verticalAlign: "middle" }}
                    >
                      <span
                        key={"sp" + index.toString() + colIndex.toString()}
                        className={colItem.maxlength ? "table-body-text" : ""}
                      >
                        {/* @ts-ignore: Unreachable code error*/}
                        {dataItem[colItem.dataField]}
                      </span>
                    </td>
                  )}
                  {!!colItem.formatter && (
                    <td key={index.toString() + colIndex.toString()}>
                      {colItem.formatter(dataItem, index)}
                    </td>
                  )}
                </>
              ))}
              <td key={"ActionTD" + index.toString()}>
                {/* @ts-ignore: Unreachable code error*/}
                <Action key={"Action" + index.toString()} item={dataItem} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {pageNumber > 1 && (
        <Pagination pageNumber={pageNumber} activePage={activePage} />
      )}
    </>
  );
}

export default CustomTable;
