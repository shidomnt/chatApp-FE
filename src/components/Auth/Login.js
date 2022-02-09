import React, { useContext, useState } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { UserContext } from '../../contexts/UserProvider'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useContext(UserContext);

  const handleSubmit = async () => {
    if (username && password) {
      await login({
        username,
        password
      });
    }
  }

  return (
    <Row justify="space-between">
      <Col span={6}>
        <Input
          size="large"
          placeholder="large size"
          prefix={<UserOutlined />}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <Input.Password
          placeholder="input password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button onClick={handleSubmit} type="primary" block>
          Login
        </Button>
      </Col>
    </Row>
  );
}

export default Login;
