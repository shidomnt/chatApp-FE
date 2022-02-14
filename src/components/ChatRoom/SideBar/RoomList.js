import React from "react"
import { List, Avatar } from 'antd'
import { NavLink } from "react-router-dom"
import VirtualList from 'rc-virtual-list';
import { BellOutlined, UserOutlined } from "@ant-design/icons";

function RoomList({ rooms, className }) {

  return (
    <div className={className}>
      <List>
        <VirtualList
          data={rooms}
          itemHeight={47}
          itemKey="_id"
        >
          {item => (
            <NavLink className="link" to={`/rooms/${item._id}`}>
              <List.Item style={{ paddingLeft: 4, paddingRight: 4 }} >
                <List.Item.Meta
                  style={{
                    alignItems: 'center',
                  }}
                  avatar={<Avatar size="large" icon={<UserOutlined />}/>}
                  title={item.name}
                  description={"Newest Message"}
                />
                <BellOutlined />
              </List.Item>
            </NavLink>
          )}
        </VirtualList>
      </List>
    </div>
  )
}

export default RoomList
