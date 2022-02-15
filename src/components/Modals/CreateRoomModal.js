import React, { useContext, useEffect, useState } from "react";
import { Modal, Input, Button, Space, Typography, Mentions } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";

import { AppContext } from "../../contexts/AppProvider";
import { apiUrl } from "../../contexts/constants";

const CreateRoomModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [friendName, setFriendName] = useState("");

  console.log(friendName);
  const { createRoom } = useContext(AppContext);

  useEffect(() => {
    if (isModalVisible) {
      axios.get(`${apiUrl}/users/`).then((res) => {
        setFriendList(res.data);
      });
    }
  }, [isModalVisible]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (roomName && friendName) {
      await createRoom({ name: roomName, username: friendName });
    }
    setFriendName("");
    setRoomName("");
    setIsModalVisible(false);
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
            onSelect={(option) => setFriendName(option.value)}
            defaultValue={friendName}
            placeholder="Input @ to mention your friends"
          >
            {friendList.map((friend) => (
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
