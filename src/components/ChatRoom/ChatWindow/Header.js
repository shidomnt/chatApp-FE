import React, { useContext } from "react";
import styled from "styled-components";
import {
  Row,
  Col,
  Avatar,
  Typography,
  Space,
  Tooltip,
  Button,
  message,
} from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import InviteFriend from "../../Modals/InviteFriend";
import { AppContext } from "../../../contexts/AppProvider";

const StyledWrapper = styled.div`
  border-bottom: 1px solid #e8e8e8;
  padding: 8px 8px;
`;

function Header({ activeRoom }) {
  const { deleteRoom } = useContext(AppContext);
  const hanleDeleteRoom = async () => {
    await deleteRoom(activeRoom._id);
    message.success("leave success");
  };
  return (
    <StyledWrapper>
      <Row>
        <Col span={12}>
          <Space size="middle">
            <Avatar icon={<UserOutlined />} size="large" />
            <Typography.Text strong>{activeRoom?.name}</Typography.Text>
          </Space>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Space>
            <Tooltip
              title={
                <Typography.Text style={{ color: "#fff" }}>
                  Invite friend
                </Typography.Text>
              }
            >
              <InviteFriend />
            </Tooltip>

            <Tooltip
              title={
                <Typography.Text style={{ color: "#fff" }}>
                  Leave room
                </Typography.Text>
              }
            >
              <Button
                type="default"
                shape="circle"
                icon={<LogoutOutlined />}
                onClick={hanleDeleteRoom}
              />
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </StyledWrapper>
  );
}

export default Header;
