import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Input,
  Button,
  Space,
  Typography,
  Mentions,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";

import { AppContext } from "../../contexts/AppProvider";
import { User, UserContext } from "../../contexts/UserProvider";
import { apiConfig, apiUrl } from "../../contexts/constants";

const CreateRoomModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [friendList, setFriendList] = useState<User[]>([]);
  const [friendName, setFriendName] = useState("");

  const { createRoom } = useContext(AppContext) as AppContext;
  const { user } = useContext(UserContext) as UserContext;

  useEffect(() => {
    if (isModalVisible) {
      axios.get(`${apiUrl}/users/`, apiConfig()).then((res) => {
        setFriendList(res.data);
      });
    }
  }, [isModalVisible]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (roomName && friendName) {
      setIsModalVisible(false);
      await createRoom({
        name: roomName,
        friendNameList: friendName
          .split("@")
          .map((item) => item.trim())
          .filter((item) => item),
      });

      setFriendName("");
      setRoomName("");
      message.success("Create successfully!");
    } else {
      message.error("Please fill in all the field!");
    }
  };

  const handleCancel = () => {
    setRoomName("");
    setFriendName("");
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        type="default"
        shape="circle"
        icon={<EditOutlined />}
        onClick={showModal}
      />
      <Modal
        title={<Typography.Title level={5}>Create Room</Typography.Title>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Input
            placeholder="Enter room's name..."
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <Mentions
            style={{ width: "100%" }}
            onChange={(text) => {
              setFriendName(text);
            }}
            value={friendName}
            placeholder="Input @ to mention your friends"
          >
            {friendList
              .filter((friend) => friend._id !== user._id)
              .map((friend) => (
                <Mentions.Option key={friend._id} value={friend.username}>
                  {friend.username}
                </Mentions.Option>
              ))}
          </Mentions>
        </Space>
      </Modal>
    </>
  );
};

export default CreateRoomModal;
