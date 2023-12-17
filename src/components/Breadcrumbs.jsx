import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ product }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="#!">{product.category}</Link>
        </li>
        <li>{product.title}</li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
