import React, { useContext } from "react";
import { StateContext } from "../App";

const Wishlist = () => {
  const { wishlist } = useContext(StateContext);

  return <div className="content">
    {
      wishlist.map((item) => (
        <div>
          <h5>{item.title}</h5>
        </div>
      ))
    }
  </div>;
};

export default Wishlist;
