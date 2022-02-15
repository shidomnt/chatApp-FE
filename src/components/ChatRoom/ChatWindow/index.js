import { Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Message from './Message';
import Header from './Header';
import { AppContext } from '../../../contexts/AppProvider';

const StyledWrapper = styled.div`
  & {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 8px;
    .messages-list {
      padding: 0 16px 0 0;
      flex: 1;
      height: calc(100% - 57px - 37px);
      overflow: auto;
    }
    .messages-list::-webkit-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }
    .messages-list::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #a5a5a5;
    }
    .messages-list::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 10%);
      border-radius: 10px;
      background-color: #f5f5f5;
    }
    .message-input {
      padding: 8px 8px;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    }
  }
`;

function ChatWindow() {
  const { roomId } = useParams();
  const [inputMessage, setInputMessage] = useState('');
  const appState = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const { getMessage, createMessage, leaveRoom, state } = appState;

  useEffect(() => {
    setLoading(true);
    getMessage(roomId).then(() => {
      setLoading(false);
    });
    return () => {
      leaveRoom(roomId);
    };
  }, [roomId]);

  const handleSubmit = () => {
    if (inputMessage) {
      createMessage({ roomId, content: inputMessage }).then(() => {
        setInputMessage('');
      });
    }
  };

  return (
    <StyledWrapper>
      <Header activeRoom={state.rooms.find((room) => room._id === roomId)} />
      <Message
        className="messages-list"
        loading={loading}
        messages={state.messages}
      />
      <Input
        className="message-input"
        onPressEnter={handleSubmit}
        onChange={(e) => setInputMessage(e.target.value)}
        value={inputMessage}
        placeholder="Enter message..."
      />
    </StyledWrapper>
  );
}

export default ChatWindow;
