import React from 'react';
import { List, Avatar, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import { Room } from '../../../reducers/AppReducer'

interface RoomListProps {
  rooms: Room[],
  className: string,
};

function RoomList({ rooms, className } : RoomListProps) {
  return (
    <div className={className}>
      <List
        itemLayout="horizontal"
        dataSource={rooms}
        rowKey={(item) => item._id}
        renderItem={(item) => (
          <NavLink className="link" to={`/rooms/${item._id}`}>
            <List.Item style={{ paddingLeft: 4, paddingRight: 4 }}>
              <List.Item.Meta
                style={{
                  alignItems: 'center',
                }}
                avatar={<Avatar size="large" icon={<UserOutlined />} />}
                title={<Typography.Text ellipsis>{item.name}</Typography.Text>}
                description={
                  <Typography.Text type="secondary" ellipsis>
                    {item.newestMessage
                      ? `${item.newestMessage?.user?.username}: ${item.newestMessage?.content}`
                      : ''}
                  </Typography.Text>
                }
              />
              <BellOutlined />
            </List.Item>
          </NavLink>
        )}
      />
    </div>
  );
}

export default React.memo(RoomList);
