import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";

const List = ({ item }) => {
  const dispatch = useDispatch();
  function addToCart() {
    dispatch({ type: "addToCart", payload : {...item , number:1} });
  }

  return (
    <div className="item">
      <h5 className="name">{item.name}</h5>
      <img src={item.image} alt="" height="100" width="100" />
      <h5 className="price">
        <b>Price : $</b>
        {item.price.toFixed(2)}
      </h5>
      <div className="d-flex justify-content-end">
        <Button onClick={() => addToCart()}>Add To Cart</Button>
      </div>
    </div>
  );
};

export default List;
