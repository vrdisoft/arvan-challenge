import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "../component/header";
import SideBar from "../component/sideBar";
import "./style/layout.scss";

function Layout({ component }: { component: any }) {
  return (
    <>
      <Header />
      <Row id="layout-main-row">
        <SideBar />
        <Col md={12} lg={10} sm={12} id="layout-continer">
          {React.createElement(component)}
        </Col>
      </Row>
    </>
  );
}

export default Layout;
