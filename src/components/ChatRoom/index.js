import { Row, Col, Divider } from "antd"
import React, { useState } from "react"
import { Outlet } from 'react-router-dom'

import SideBar from './SideBar'

function ChatRoom() {
  return (
    <Row style={{ height: '100vh' }}>
      <Col span={5}>
        <SideBar />
      </Col>
      <Col span={19}>
        <Outlet />
      </Col>
    </Row>
  )
}

export default ChatRoom
