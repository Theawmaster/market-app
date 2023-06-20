import { Table, Button, Modal } from "antd";
import React, { useState, useEffect} from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";

import {
  DeleteOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [receipt, setReceipt] = useState(false)
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState(0)
  const increase_num = (record) => {
    dispatch({
      type: "updateCart",
      payload: { ...record, number: record.number + 1 },
    });
  };

  const decrease_num = (record) => {
    if (record.number !== 1) {
      dispatch({
        type: "updateCart",
        payload: { ...record, number: record.number - 1 },
      });
    }
  };

  const table_col = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => <span>${price.toFixed(2)}</span>,
    },
    {
      title: "Number",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusSquareOutlined
            className="mx-2"
            onClick={() => increase_num(record)}
          />
          <b>{record.number}</b>
          <MinusSquareOutlined
            className="mx-2"
            onClick={() => decrease_num(record)}
          />
        </div>
      ),
    },
    {
      title: "Option",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          onClick={() => dispatch({ type: "deleteFromCart", payload: record })}
        />
      ),
    },
  ];

  useEffect(() => {
  let temp = 0;
  cartItems.forEach((item) => {
    temp = temp + item.price * item.number;
  });

  setSubTotal(temp);
}, [cartItems]);


  return (
    <DefaultLayout>
      <h2>Cart</h2>
      <Table columns={table_col} dataSource={cartItems} bordered />
      <hr />
      <div className="d-flex justify-content-end flex-column align-items-end">
        <div className="subtotal"> 
          <h3>Sub Total:<b>${subTotal.toFixed(2)}</b></h3>
        </div>

        <Button type="primary" onClick={()=>setReceipt(true)}>Place Order</Button>
      </div>

      <Modal title="Confirm order?" visible={receipt}></Modal>
    </DefaultLayout>
  );
}
