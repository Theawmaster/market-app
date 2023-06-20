import React, { useEffect } from 'react';
import "../assets/authenticate.css";
import { Button, Col, Form, Input, Row, message} from 'antd';
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
                <h3>Registeration Form</h3>
                <Form.Item name="name" label="Name">
                <Input />
                </Form.Item>
                <Form.Item name="userId" label="User ID">
                <Input />
                </Form.Item>
                <Form.Item name="password" label="Password">
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
