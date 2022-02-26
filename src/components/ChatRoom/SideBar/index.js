import React, { useState } from 'react';
import styled from 'styled-components';
import { Space, Input } from 'antd';

import RoomList from './RoomList';
import UserInfo from './UserInfo';
import { SearchOutlined } from '@ant-design/icons';
import { useAppContext, useUserContext } from '../../../hooks';

const StyledWrapper = styled.div`
  & {
    background-image: linear-gradient(#fff, #f8f8f8);
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 12px 8px;
    border-right: 1px solid #e8e8e8;
    .space {
      height: 100%;
      & > .ant-space-item:last-child {
        overflow: hidden;
        scrollbar-gutter: stable both-edges;
        &:hover {
          overflow: auto;
        }
        flex: 1;
        .room-list .link.active {
          background-color: #f5f5f5;
        }
        .room-list .link {
          border-radius: 10px;
        }
      }
      & > .ant-space-item:last-child::-webkit-scrollbar {
        width: 8px;
        background-color: #f5f5f5;
      }
      & > .ant-space-item:last-child::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: rgba(0,0,0,0.2);
      }
      & > .ant-space-item:last-child::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: transparent;
      }
    }
  }
`;

function SideBar() {
  const [filterInput, setFilterInput] = useState('');
  const { state } = useAppContext();
  const { user } = useUserContext();
  const { rooms } = state;

  return (
    <StyledWrapper>
      <Space className="space" size="middle" direction="vertical">
        <UserInfo
          className="user-info"
          username={user.username}
          avatarSrc={user.avatar}
        />
        <Input
          placeholder="Search Room..."
          suffix={<SearchOutlined />}
          onChange={(e) => setFilterInput(e.target.value)}
          value={filterInput}
        />
        <RoomList
          rooms={rooms.filter((room) =>
            room?.name.toLowerCase().includes(filterInput.toLowerCase().trim())
          )}
          className="room-list"
        />
      </Space>
    </StyledWrapper >
  );
}

export default SideBar;
