import { Row, Col } from "antd"
import React from "react"
import { Outlet } from 'react-router-dom'

import SideBar from './SideBar'

function ChatRoom() {
  return (
    <Row style={{ height: '100vh' }}>
      <Col style={{height: '100%'}} span={5}>
        <SideBar />
      </Col>
      <Col style={{height: '100%'}} span={19}>
        <Outlet />
      </Col>
    </Row>
  )
}

export default ChatRoom
