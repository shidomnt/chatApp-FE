import React, { useState } from 'react';
import styled from 'styled-components';
import { Space, Input } from 'antd';

import RoomList from './RoomList';
import UserInfo from './UserInfo';
import { SearchOutlined } from '@ant-design/icons';

const StyledWrapper = styled.div`
  &&& {
    background-image: linear-gradient(#fff, #f8f8f8);
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 12px 8px;
    border-right: 1px solid #e8e8e8;
    .space {
      height: 100%;
      .ant-space-item:last-child {
        flex: 1;
        .room-list {
          height: 100%;
          overflow: auto;
        }
        .room-list .link.active {
          background-color: #f5f5f5;
        }
        .room-list .link {
          border-radius: 10px;
        }
      }
    }
  }
`;

const rooms = [
  {
    id: 1,
    name: 'Room1',
  },
  {
    id: 2,
    name: 'Room2',
  },
  {
    id: 3,
    name: 'Room3',
  },
];

function SideBar() {
  const [filterInput, setFilterInput] = useState('');

  return (
    <StyledWrapper>
      <Space className="space" size="middle" direction="vertical">
        <UserInfo className="user-info" />
        <Input
          placeholder="Search Room..."
          suffix={<SearchOutlined />}
          onChange={(e) => setFilterInput(e.target.value)}
          value={filterInput}
        />
        <RoomList
          rooms={rooms.filter((room) =>
            room.name.toLowerCase().includes(filterInput.toLowerCase().trim())
          )}
          className="room-list"
        />
      </Space>
    </StyledWrapper>
  );
}

export default SideBar;
