import { Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Message from "./Message";
import Header from "./Header";
import { AppContext } from "../../../contexts/AppProvider";

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

function ChatWindow() {
  const { roomId } = useParams();
  const [listMessage, setListMessage] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const appState = useContext(AppContext);

  const { getMessage, createMessage } = appState;

  useEffect(() => {
    getMessage(roomId, (messages) => {
      setListMessage(messages);
    });
  }, [roomId]);

  const handleSubmit = () => {
    if (inputMessage) {
      createMessage({ roomId, content: inputMessage }, (newMessage) => {
        setListMessage([...listMessage, newMessage]);
        setInputMessage("");
      });
    }
  };

  return (
    <StyledWrapper>
      <Header />
      <Message className="messages-list" messages={listMessage} />
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
