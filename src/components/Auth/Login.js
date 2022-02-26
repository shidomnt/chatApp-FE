import React, { useState } from 'react';
import { Row, Col, Input, Button, Tooltip, Typography, Space, message } from 'antd';
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { login } from '../../contexts/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (username && password) {
      login({
        username,
        password,
      })
        .then(res => {
          message[res.success ? 'success' : 'error'](res.message)
        })
    } else {
      message.error('Please fill out all fields')
    }
  };

  return (
    <Row style={{ height: '100vh', alignItems: 'center' }} justify="space-around">
      <Col span={6}>
        <Typography.Title level={3}>Log in to your account</Typography.Title>
        <Space direction="vertical">
          <Input
            size="large"
            placeholder="username..."
            prefix={<UserOutlined />}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            suffix={
              <Tooltip title="Bla bla...">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
            }
            onPressEnter={handleSubmit}
          />
          <Input.Password
            size="large"
            placeholder="password..."
            prefix={<KeyOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onPressEnter={handleSubmit}
          />
          <Button onClick={handleSubmit} type="primary" block>
            Login
          </Button>
          <Link to="/register">Register</Link>
        </Space>
      </Col>
    </Row>
  );
}

export default Login;
