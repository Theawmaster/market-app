import DefaultLayout from "../components/DefaultLayout";
import "../assets/items.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  message,
} from "antd";

const Items = () => {
  const [itemsData, setItemsData] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.rootReducer);
  const [addItem, setAddItem] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        setTimeout(() => {
          dispatch({ type: "hideLoading" });
          setItemsData(response.data);
        }, 500); // Adjust the delay time as needed
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const deleteItems = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/items/delete-item", { itemId: record._id })
      .then((response) => {
        setTimeout(() => {
          dispatch({ type: "hideLoading" });
          message.success("Item deleted successfully!");
          getAllItems();
        }, 500); // Adjust the delay time as needed
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Something went wrong...");
        console.log(error);
      });
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
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Option",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditItem(record);
              setAddItem(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              deleteItems(record);
            }}
          />
        </div>
      ),
    },
  ];

  const validatePrice = (_, value) => {
    if (value && value < 0.01) {
      return Promise.reject("Price must be above 0.00");
    }
    return Promise.resolve();
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    if (editItem === null) {
      axios
        .post("/api/items/add-item", values)
        .then((response) => {
          setTimeout(() => {
            dispatch({ type: "hideLoading" });
            message.success("Item added successfully!");
            setAddItem(false);
            getAllItems();
          }, 500); // Adjust the delay time as needed
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("Something went wrong...");
          console.log(error);
        });
    } else {
      axios
        .post("/api/items/edit-item", { ...values, itemId: editItem._id })
        .then((response) => {
          setTimeout(() => {
            dispatch({ type: "hideLoading" });
            message.success("Item edited successfully!");
            setEditItem(null);
            setAddItem(false);
            getAllItems();
          }, 500); // Adjust the delay time as needed
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("Something went wrong...");
          console.log(error);
        });
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h2>Items</h2>
        <Button type="primary" onClick={() => setAddItem(true)}>
          Add item
        </Button>
      </div>
      <Table columns={table_col} dataSource={itemsData} bordered />
      {addItem && (
        <Modal
          onCancel={() => {
            setEditItem(null);
            setAddItem(false);
          }}
          visible={addItem}
          title={`${editItem !== null ? "Editing Items" : "Adding New Items"}`}
          footer={false}
        >
          <Form initialValues={editItem} layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Cost"
              rules={[{ validator: validatePrice }]}
            >
              <InputNumber step={0.01} />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Type">
              <Select>
                <Select.Option value="fruits">Fruits</Select.Option>
                <Select.Option value="vegetables">Vegetables</Select.Option>
                <Select.Option value="meats">Meat</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button htmlType="submit" type="primary">
                Input
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default Items;
