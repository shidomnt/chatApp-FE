import React from "react";
import {
  Row,
  Col,
  Avatar,
  Button,
  Space,
  Popover,
  Typography,
  Popconfirm,
} from "antd";
import {
  UserOutlined,
  MoreOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import CreateRoomModal from "../../Modals/CreateRoomModal";
import { signOut } from "../../../contexts/auth";

const StyledContent = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

function UserInfo({ className, username, avatarSrc }) {
  const handleSignOut = () => {
    signOut();
  };

  const avatarProp = avatarSrc
    ? { src: avatarSrc }
    : { icon: <UserOutlined /> };

  return (
    <Row className={className} align="middle" justify="space-between">
      <Col span={12}>
        <Space>
          <Avatar shape="circle" size="large" {...avatarProp} />
          <Typography.Title level={5} style={{ margin: 0 }} ellipsis>
            {username}
          </Typography.Title>
        </Space>
      </Col>
      <Col style={{ textAlign: "right" }} span={12}>
        <Space>
          <Popover
            placement="bottomLeft"
            content={
              <StyledContent>
                <Popconfirm
                  title="Are you sure you want to sign out?"
                  onConfirm={handleSignOut}
                  okText="Sign Out"
                  cancelText="Cancel"
                  placement="bottom"
                >
                  <Button type="default" danger icon={<LogoutOutlined />}>
                    Sign Out
                  </Button>
                </Popconfirm>
              </StyledContent>
            }
            trigger="click"
          >
            <Button type="default" shape="circle" icon={<MoreOutlined />} />
          </Popover>

          <CreateRoomModal />
        </Space>
      </Col>
    </Row>
  );
}

export default React.memo(UserInfo);
