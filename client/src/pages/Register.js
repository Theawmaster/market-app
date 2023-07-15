import React, { useEffect } from 'react';
import "../assets/authenticate.css";
import { Button, Col, Form, Input, Row, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = (values) => {
    dispatch({type:"showLoading"})
    axios.post("/api/users/register", values).then((res)=>{
      dispatch({type:"hideLoading"})
      message.success("Registration complete, pending verification")
      navigate("/login")
    }).catch((error)=>{
      dispatch({type:"hideLoading"})
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message)
      } else {
        message.error("Invalid/Empty fields")
      }
    })
  };

  useEffect(() => {
    if(localStorage.getItem("pos-user"))
    navigate("/home")
  }, [])

  const strongPasswordValidator = (rule, value) => {
    if (!value || value.length < 8 || !/[A-Z]/.test(value) || !/[0-9]/.test(value) || !/[!@#\$%\^&\*]/.test(value)) {
      return Promise.reject('Please choose a stronger password. It should contain at least 8 characters, an uppercase letter, a number, and a special character.');
    }
    return Promise.resolve();
  };

  return (
    <div className="authenticate">
      <Row>
        <Col lg={11} xs={22}>
            <Form layout="vertical" onFinish={onFinish}>
                <h1><b>The AM POS</b></h1>
                <hr />
                <h3>Registration Form</h3>
                <Form.Item name="name" label="Name">
                <Input />
                </Form.Item>
                <Form.Item name="userId" label="User ID">
                <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ validator: strongPasswordValidator }]}>
                <Input type="password"/>
                </Form.Item>
                <div className="d-flex justify-content-between align-items-center">
                <Link to="/login">Click Here To Login</Link>
                <Button htmlType="submit" type="primary">
                    Register
                </Button>
                </div>
            </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
