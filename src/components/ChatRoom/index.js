import { Row, Col } from "antd"
import React from "react"
import { Outlet } from 'react-router-dom'

import SideBar from './SideBar'

function ChatRoom() {
  return (
    <Row style={{ height: '100vh' }}>
      <Col xs={2} sm={2} md={2} lg={5} style={{height: '100%'}} span={5}>
        <SideBar />
      </Col>
      <Col xs={22} sm={22} md={22} lg={19} style={{height: '100%'}} span={19}>
        <Outlet />
      </Col>
    </Row>
  )
}

export default ChatRoom
