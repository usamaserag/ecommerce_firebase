import React from "react";
import { Dropdown, Space } from "antd";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const items = [
  {
    key: "1",
    label: (
      <Link
        className="dropdown_item"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Home One
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link
        className="dropdown_item"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Home Two
      </Link>
    ),
  },
];
const DropDown = ({ text }) => (
  <Dropdown
    menu={{
      items,
    }}
  >
    <a href="!#" onClick={(e) => e.preventDefault()}>
      <Space className="main_nav_item">
        <p className="main_nav_item_text">
          {text} <FaAngleDown />
        </p>
      </Space>
    </a>
  </Dropdown>
);
export default DropDown;
