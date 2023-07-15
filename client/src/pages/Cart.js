import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Modal,
  message,
  Select,
  Table,
} from "antd";
import {
  DeleteOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [receipt, setReceipt] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subTotal, setSubTotal] = useState(0);
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

const onFinish=(values)=>{

  const reqObject={
    ...values,
    cartItems, 
    subTotal,
    gst: Number(((subTotal / 100) * 8).toFixed(2)),
    totalAmount: Number(subTotal + Number(((subTotal / 100) * 8).toFixed(2))),
    userId: JSON.parse(localStorage.getItem("pos-user"))._id
  }

  axios.post ("/api/bills/charge-bill", reqObject).then(()=>{
    message.success("Payment received successfully.")
    navigate("/receipts")
  }).catch(()=>{
    message.error("Something went wrong")
  })

};

  return (
    <DefaultLayout>
      <h2>Cart</h2>
      <Table columns={table_col} dataSource={cartItems} bordered pagination={false}/>
      <hr />
      <div className="d-flex justify-content-end flex-column align-items-end">
        <div className="subtotal">
          <h3>
            Sub Total:<b>${subTotal.toFixed(2)}</b>
          </h3>
        </div>

        <Button type="primary" onClick={() => setReceipt(true)}>
          Place Order
        </Button>
      </div>

      <Modal title="Confirm order?" visible={receipt} footer={false} onCancel={()=>setReceipt(false)}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="customerName" label="Full Name">
            <Input />
          </Form.Item>
          <Form.Item
            name="customerPhoneNumber"
            label="Contact Number"
          >
            <Input />
          </Form.Item>
          <Form.Item name="paymentMode" label="Mode Of Payment">
            <Select>
              <Select.Option value="paynow">PayNow/PayLah</Select.Option>
              <Select.Option value="card">Debit Card</Select.Option>
              <Select.Option value="bank">Bank Transfer</Select.Option>
            </Select>
          </Form.Item>

          <div className="total-bill-amount">
            <h5>GST: $<b>{(Number(subTotal.toFixed(2)) / 100 * 8).toFixed(2)}</b></h5>
            <hr />
            <h2>Grand Total: $<b>{subTotal + ((subTotal / 100) * 8)}</b></h2>
          </div>

          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              Proceed to order
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
}
