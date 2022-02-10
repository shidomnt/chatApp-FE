import React, { useContext, useState } from 'react';
import { Row, Col, Input, Button, Tooltip } from 'antd';
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { UserContext } from '../../contexts';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(UserContext);

  const handleSubmit = async () => {
    if (username && password) {
      await login({
        username,
        password,
      });
    }
  };

  return (
    <Row justify="space-around">
      <Col span={6}>
        <Input
          size="large"
          placeholder="username..."
          prefix={<UserOutlined />}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          suffix={
            <Tooltip title="Quy tac dat ten...">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
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
        />
        <Button onClick={handleSubmit} type="primary" block>
          Login
        </Button>
        <Link to="/register">Register</Link>
      </Col>
    </Row>
  );
}

export default Login;
