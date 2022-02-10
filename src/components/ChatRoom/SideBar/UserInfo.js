import React, { useState } from "react"
import { Row, Col, Avatar, Tooltip, Button, Space, Popover, Typography } from 'antd'
import { UserOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import styled from "styled-components"

const StyledContent = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.1);
`

function UserInfo({ className }) {
  return (
    <Row className={className} align="middle" justify="space-between">
      <Col span={12}>
        <Space>
          <Avatar size="large" src={""} icon={<UserOutlined />} />
          <Typography.Text>{"Name"}</Typography.Text>
        </Space>
      </Col>
      <Col style={{ textAlign: 'right' }} span={12}>
        <Space>
          <Popover placement="bottomLeft" content={
            <StyledContent>
              <Button type="default" danger>Sign Out</Button>
            </StyledContent>
          } trigger="focus">
            <Button type="default" shape="circle" icon={<MoreOutlined />} />
          </Popover>
          <Tooltip title="New">
            <Button type="default" shape="circle" icon={<EditOutlined />} />
          </Tooltip>
        </Space>
      </Col>
    </Row>
  )
}

export default UserInfo
