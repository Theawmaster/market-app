import DefaultLayout from "../components/DefaultLayout";
import "../assets/receipts.css";
import React, { useEffect, useState, useRef, forwardRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import ReactToPrint, { useReactToPrint } from "react-to-print";

const PrintableArea = forwardRef(({ selectReceipt, cart_table_col }, ref) => (
  <div className="receipt-model" ref={ref}>
    <div className="d-flex justify-content-between receipt-header pb-2">
      <div>
        <h1><b>The AM Market Place</b></h1>
      </div>
      <div>
        <p>Singapore</p>
        <p>Woodlands 721127</p>
        <p>81726354</p>
      </div>
    </div>
    <div className="receipt-customer-details my-2">
      <p><b>Name: </b> {selectReceipt.customerName}</p>
      <p><b>Contact Number: </b> {selectReceipt.customerPhoneNumber}</p>
      <p><b>Order Date: </b> {selectReceipt.createdAt.toString().substring(0,10)}</p>
    </div>
    <Table dataSource={selectReceipt.cartItems} columns={cart_table_col} pagination={false}/>
    <div className= "dotted-border mt-2">
      <p><b>SUB TOTAL</b>: ${selectReceipt.subTotal}</p>
      <p><b>GST</b>: ${selectReceipt.gst}</p>
    </div>
    <div className= "mt-2">
      <h2><b>GRAND TOTAL</b>: ${selectReceipt.totalAmount}</h2>
    </div>
    <div className="dotted-border mt-2"></div>
    <div className="text-center mt-2">
      <p>Thank you for shopping with us!</p>
      <p>We do hope that you will visit us again :)</p>
    </div>
  </div>
));

const Receipts = () => {
  const componentRef = useRef();
  const [receiptsData, setReceiptsData] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.rootReducer);
  const [selectReceipt, setSelectReceipt] = useState(null);
  const [receiptModalVisibility, setReceiptModalVisibility] = useState(false);

  const getAllReceipts = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/bills/get-all-bill")
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          dispatch({ type: "hideLoading" });
          const data = response.data
          data.reverse()
          setReceiptsData(data);
        }, 500);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const table_col = [
    {
      title: "Reference ID",
      dataIndex: "_id",
    },
    {
      title: "Name of customer",
      dataIndex: "customerName",
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
      render: (text) => `$${parseFloat(text).toFixed(2)}`
    },
    {
      title: "GST",
      dataIndex: "gst",
      render: (text) => `$${text}`
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (text) => `$${text}`
    },
    {
      title: "Option",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EyeOutlined
            className="mx-2"
            onClick={() =>{
              setSelectReceipt(record);
              setReceiptModalVisibility(true);
            }}
          />
        </div>
      ),
    },
  ];

  const cart_table_col = [
    {
      title: "Name",
      dataIndex: "name",
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
          <b>{record.number}</b>
        </div>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <b>${(record.number* record.price).toFixed(2)}</b>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllReceipts();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h2>Items</h2>
      </div>
      <Table columns={table_col} dataSource={receiptsData} bordered />

      {receiptModalVisibility && (
        <Modal
          onCancel={() => {
            setReceiptModalVisibility(false);
          }}
          visible={receiptModalVisibility}
          title="Receipt Details"
          footer={false}
          width={800}
        >
          <PrintableArea ref={componentRef} selectReceipt={selectReceipt} cart_table_col={cart_table_col} />
          <div className="d-flex justify-content-end p-3">
            <Button type="primary" onClick={handlePrint}>
              Print Receipt
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default Receipts;
