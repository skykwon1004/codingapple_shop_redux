import React, { useState } from "react";
import data from "../data";
import { Link } from "react-router-dom";

const Item = ({ shoes }) => {
  return (
    <>
      {shoes.map((it, idx) => (
        <div className="col-md-4" key={idx}>
          <Link to={`/detail/${shoes[idx].id}`}>
            <img
              src={`https://codingapple1.github.io/shop/shoes${idx + 1}.jpg`}
              width="80%"
            />
          </Link>
          <h4>{shoes[idx].title}</h4>
          <p>{shoes[idx].content}</p>
        </div>
      ))}
    </>
  );
};

export default Item;
