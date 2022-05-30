import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import { Article } from "../type";

function Action(item: Article) {
  const handleEdit = (row: Article, event: any) => {
    console.log(row);
    event.stopPropagation();
  };

  const handleDelete = (row: Article, event: any) => {
    console.log(row);
    event.stopPropagation();
  };

  return (
    <DropdownButton title="...">
      <Dropdown.Item
        onClick={(event) => {
          console.log(item);
          handleEdit(item, event);
        }}
      >
        Edit
      </Dropdown.Item>
      <Dropdown.Item
        onClick={(event) => {
          console.log(item);
          handleDelete(item, event);
        }}
      >
        Delete
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default Action;
