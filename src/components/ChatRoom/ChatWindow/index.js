import { Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Message from './Message';
import Header from './Header';
import { AppContext } from '../../../contexts/AppProvider';

const StyledWrapper = styled.div`
  &&& {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 4px;
    .messages-list {
      flex: 1;
      height: calc(100% - 57px - 37px);
      overflow: auto;
    }
    .messages-list::-webkit-scrollbar {
      display: none;
    }
  }
`;

function ChatWindow() {
  const { roomId } = useParams();
  const [inputMessage, setInputMessage] = useState('');
  const appState = useContext(AppContext);

  const { getMessage, createMessage, leaveRoom, state } = appState;

  useEffect(() => {
    getMessage(roomId);
    return () => {
      leaveRoom(roomId);
    };
  }, [roomId]);

  const handleSubmit = async () => {
    if (inputMessage) {
      await createMessage({ roomId, content: inputMessage });
      setInputMessage('');
    }
  };

  return (
    <StyledWrapper>
      <Header activeRoom={state.rooms.find((room) => room._id === roomId)} />
      <Message className="messages-list" messages={state.messages} />
      <Input
        onPressEnter={handleSubmit}
        onChange={(e) => setInputMessage(e.target.value)}
        value={inputMessage}
        placeholder="Enter message..."
      />
    </StyledWrapper>
  );
}

export default ChatWindow;
