import React, { useEffect } from 'react';
import "../assets/authenticate.css";
import { Button, Col, Form, Input, Row, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = (values) => {
    dispatch({type:"showLoading"})
    axios.post("/api/users/login", values).then((res)=>{
      dispatch({type:"hideLoading"})
      message.success("Login successful!")
      localStorage.setItem("pos-user", JSON.stringify(res.data))
      navigate("/home")
    }).catch(()=>{
      dispatch({type:"hideLoading"})
      message.error("Something went wrong..")
    })
  };

  useEffect(() => {
    if(localStorage.getItem("pos-user"))
    navigate("/home")
  }, [])

  return (
    <div className="authenticate">
      <Row>
        <Col lg={11} xs={22}>
            <Form layout="vertical" onFinish={onFinish}>
                <h1><b>The AM POS</b></h1>
                <hr />
                <h3>Login Page</h3>
                <Form.Item name="userId" label="User ID">
                <Input />
                </Form.Item>
                <Form.Item name="password" label="Password">
                <Input type="password"/>
                </Form.Item>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/register">Click Here To Register</Link>
                <Button htmlType="submit" type="primary">
                    Login
                </Button>
                </div>
            </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
