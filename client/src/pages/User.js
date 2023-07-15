import DefaultLayout from "../components/DefaultLayout";
import "../assets/receipts.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table, Form, Input, Upload, message } from "antd";
import { getBase64 } from '../utils/helpers';
import { validatePassword, validateFile } from '../utils/validators';

const User = () => {
  const componentRef = useRef();
  const [receiptsData, setReceiptsData] = useState([]);
  const [passwordForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.rootReducer);
  const [isUploaded, setIsUploaded] = useState(false);

  const getAllReceipts = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/bills/get-all-bill")
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          dispatch({ type: "hideLoading" });
          const data = response.data;
          data.reverse();
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
      title: "User's Name",
      dataIndex: "customerName",
    },
    {
      title: "Contact Number",
      dataIndex: "customerPhoneNumber",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render: (value) => <span>{value.toString().substring(0, 10)}</span>,
    },
  ];

  useEffect(() => {
    getAllReceipts();
  }, []);

  const handlePasswordSubmit = async () => {
    try {
      const values = await passwordForm.validateFields();
      const { oldPassword, newPassword } = values;
  
      // Make a request to update the password
      const response = await axios.put("/api/users/update-password", {
        userId: JSON.parse(localStorage.getItem("pos-user")).userId,
        newPassword: newPassword,
      });
  
      // Check the response status and display the appropriate message
      if (response.status === 200) {
        message.success("Password changed successfully");
      } else {
        message.error("Failed to update the password");
      }
    } catch (error) {
      console.log("Error in handlePasswordSubmit:", error);
    }
  };

  const handleFileUpload = ({ file, fileList }) => {
    console.log('file:', file);
  
    if (validateFile(file)) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        localStorage.setItem('profilePicture', imageUrl);
        setFileList(fileList.filter(file => file.status === 'done'));
        message.success(`${file.name} file uploaded successfully.`);
      };
      reader.onerror = () => {
        message.error('Failed to read the file.');
      };
  
      if (file instanceof Blob) {
        reader.readAsDataURL(file);
      } else {
        message.error('Invalid file object.');
      }
    } else {
      message.error(`${file.name} is not a valid image file.`);
    }
  };
  
  const handleProfilePictureSubmit = () => {
    if (fileList.some(file => file.status === 'done')) {
      // Send profile picture update request to backend
      console.log('Picture uploaded successfully');
    } else {
      message.error('Please upload an image for the profile picture');
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h2>User</h2>
      </div>
      <Table columns={table_col} dataSource={receiptsData} bordered />
      <div>
        <h2>Update Password</h2>
        <Form form={passwordForm}>
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: 'Please enter your old password',
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Please enter your new password',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              {
                required: true,
                message: 'Please confirm your new password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button type="primary" onClick={handlePasswordSubmit}>Change Password</Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <h2>Update Profile Picture</h2>
        <Form>
          <Form.Item label="Profile Picture">
            <Upload
              beforeUpload={() => false} 
              onChange={handleFileUpload}
              fileList={fileList}
            >
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button type="primary" onClick={handleProfilePictureSubmit}>Update Picture</Button>
          </Form.Item>
        </Form>
      </div>
    </DefaultLayout>
  );
};

export default User;
