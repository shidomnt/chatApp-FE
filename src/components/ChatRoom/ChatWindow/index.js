import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Message from './Message';
import Header from './Header'

const StyledWrapper = styled.div`
  &&& {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 4px;
    .messages-list {
      flex: 1;
    }
  }
`;

const messagesList = [
  {
    username: 'tranha',
    content: 'test',
    createAt: 'time create'
  },
  {
    username: 'tranha',
    content: 'test',
    createAt: 'time create'
  },
  {
    username: 'tranha',
    content: 'test',
    createAt: 'time create'
  },
  {
    username: 'tranha',
    content: 'test',
    createAt: 'time create'
  },
]

function ChatWindow() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Call API and setMessages()
    setMessages(messagesList);
  }, [roomId]);

  const handleSubmit = () => {
  };

  return (
    <StyledWrapper>
      <Header />
      <Message className="messages-list" messages={messages} />
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
