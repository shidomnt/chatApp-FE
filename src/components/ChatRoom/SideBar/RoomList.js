import React from "react"
import { List, Avatar, Typography } from 'antd'
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
                  title={<Typography.Text ellipsis>{item.name}</Typography.Text>}
                  description={<Typography.Text type="secondary" ellipsis>{"Newest Message"}</Typography.Text>}
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

export default React.memo(RoomList)
