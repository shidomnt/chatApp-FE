import React, { useContext, useState } from "react";
import { Row, Col, Input, Button } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { UserContext } from "../../contexts/UserProvider";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const { register } = useContext(UserContext);

  const handleChange = (info) => {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl));
  };

  const handleSubmit = async () => {
    if (username && password && confirmPassword) {
      if (password === confirmPassword) {
        await register({
          username,
          password,
          email,
          avatar: imageUrl,
        });
      }
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
        />
        <Input
          size="large"
          placeholder="email..."
          prefix={<MailOutlined />}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
        <Input.Password
          size="large"
          placeholder="password confirm..."
          prefix={<KeyOutlined />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
        <Button onClick={handleSubmit} type="primary" block>
          Register
        </Button>
        <Link to="/login">Login</Link>
      </Col>
    </Row>
  );
}

export default Register;
