import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import "../login/style/login.sass";
import { useToken } from "../../context/tokenContext";
import { articles } from "../../api/articles";

function Articles() {
  const location = useLocation();
  const { logoutContext } = useToken();
  useEffect(() => {
    articles({ limit: 10, offset: 0 });
  }, []);

  const onClickHandle = (index: number, event: any) => {
    console.log(index);
    event.stopPropagation();
  };
  return (
    <div className="continer">
      <div className="login-continer">
        <Table responsive borderless>
          <thead>
            <tr>
              <th>#</th>
              {Array.from({ length: 12 }).map((_, index) => (
                <th key={index}>Table heading</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              <td>2</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
            <tr>
              <td>3</td>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>
                  <DropdownButton id="dropdown-basic-button" title="...">
                    <Dropdown.Item
                      onClick={(event) => {
                        onClickHandle(index, event);
                      }}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                  </DropdownButton>
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Articles;
