import React, { useState } from 'react';
import { Row, Col, Input, Button, Typography, Space, message } from 'antd';
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { register } from '../../contexts/auth';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  // const [avatarUrl, setAvatarUrl] = useState('');

  const handleSubmit = () => {
    if (username && password && confirmPassword) {
      if (password === confirmPassword) {
        register({
          username,
          password,
          email,
          // avatar: avatarUrl,
        }).then((res) => {
          message[res.success ? 'success' : 'error'](res.message);
        });
      } else {
        message.error("Password and Confirm password doesn't match");
      }
    } else {
      message.error('Please fill out all fields');
    }
  };

  // const handleChangeImage = (e) => {
  //   const file = e.target.files[0];
  //   if (file?.size >= 2097152) {
  //     message.error('File too large!');
  //     return;
  //   }
  //   const fileReader = new FileReader();
  //   fileReader.onload = (e) => {
  //     setAvatarUrl(e.target.result);
  //   };
  //   fileReader.readAsDataURL(file);
  // };

  return (
    <Row
      style={{ height: '100vh', alignItems: 'center' }}
      justify="space-around"
    >
      <Col span={6}>
        <Typography.Title level={3}>Create your account</Typography.Title>
        <Space direction="vertical">
          <Input
            size="large"
            placeholder="username..."
            prefix={<UserOutlined />}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onPressEnter={handleSubmit}
          />
          <Input
            size="large"
            placeholder="email..."
            prefix={<MailOutlined />}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
          <Input.Password
            size="large"
            placeholder="password confirm..."
            prefix={<KeyOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            onPressEnter={handleSubmit}
          />
          {/* <Input type="file" onChange={handleChangeImage} accept="image/*" /> */}
          {/* <img src={avatarUrl} width="100%" /> */}
          <Button onClick={handleSubmit} type="primary" block>
            Register
          </Button>
          <Link to="/login">Login</Link>
        </Space>
      </Col>
    </Row>
  );
}

export default Register;
