import React from "react"
import styled from 'styled-components'
import { Row, Col, Avatar, Typography, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const StyledWrapper = styled.div`
  border-bottom: 1px solid #e8e8e8;
  padding: 8px 8px;
`

function Header({ activeRoom }) {
  return (
    <StyledWrapper>
      <Row>
        <Col span={12}>
          <Space size="middle">
            <Avatar icon={<UserOutlined />} size="large"/>
            <Typography.Text strong>{activeRoom.name}</Typography.Text>
          </Space>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
        </Col>
      </Row>
    </StyledWrapper>
  )
}

export default Header
