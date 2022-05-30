import React from "react";
import Table from "react-bootstrap/Table";
import "./style/table.sass";

type ColumnsType = {
  dataField: string;
  text: string;
  formatter?: any;
  maxlength?: boolean;
};

interface TableProps<T> {
  columns: ColumnsType[];
  data: T[];
}

function CustomTable<T>({ columns, data }: TableProps<T>) {
  return (
    <>
      <Table responsive borderless>
        <thead>
          <tr style={{ backgroundColor: "#eceeef", color: "#55595c" }}>
            {columns.map((item, index) => (
              <th key={item.dataField}>{item.text}</th>
            ))}
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
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default CustomTable;
