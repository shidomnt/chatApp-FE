import React, { useContext } from "react"
import { Row, Col, Avatar, Tooltip, Button, Space, Popover, Typography } from 'antd'
import { UserOutlined, MoreOutlined, UserAddOutlined } from '@ant-design/icons'
import styled from "styled-components"

import CreateRoomModal from '../../Modals/CreateRoomModal'
import { UserContext } from '../../../contexts/UserProvider'

const StyledContent = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
`

function UserInfo({ className, avatarSrc }) {
  const { signOut } = useContext(UserContext);
  const handleSignOut = () => {
    signOut();
  };

  const avatarProp = avatarSrc ? { src: avatarSrc } : { icon: <UserOutlined /> }

  return (
    <Row className={className} align="middle" justify="space-between">
      <Col span={12}>
        <Space>
          <Avatar shape="circle" size="large" {...avatarProp} />
          <Typography.Text>{"Name"}</Typography.Text>
        </Space>
      </Col>
      <Col style={{ textAlign: 'right' }} span={12}>
        <Space>
          <Popover placement="bottomLeft" content={
            <StyledContent>
              <Button type="default" danger onClick={handleSignOut}>Sign Out</Button>
            </StyledContent>
          } trigger="focus">
            <Button type="default" shape="circle" icon={<MoreOutlined />} />
          </Popover>
          <Tooltip>
            <Button type="default" shape="circle" icon={<UserAddOutlined />}></Button>
          </Tooltip>
          <Tooltip title="New">
            <CreateRoomModal />
          </Tooltip>
        </Space>
      </Col>
    </Row>
  )
}

export default UserInfo
