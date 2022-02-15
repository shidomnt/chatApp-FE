import React, { useContext, useEffect, useState } from 'react';
import { Modal, Input, Button, Space, Typography, Mentions } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';

import { AppContext } from '../../contexts/AppProvider';
import { UserContext } from '../../contexts/UserProvider';
import { apiUrl } from '../../contexts/constants';

const CreateRoomModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [friendList, setFriendList] = useState([]);
  const [friendName, setFriendName] = useState('');

  const { createRoom } = useContext(AppContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (isModalVisible) {
      axios.get(`${apiUrl}/users/`).then((res) => {
        setFriendList(res.data);
      });
    }
  }, [isModalVisible]);

  useEffect(() => {
    console.log(
      friendName
        .split('@')
        .map((item) => item.trim())
        .filter((item) => item)
    );
  }, [friendName]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (roomName && friendName) {
      await createRoom({
        name: roomName,
        username: friendName.split('@').map((item) => item.trim()),
      });
    }
    setFriendName('');
    setRoomName('');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setRoomName('');
    setFriendName('');
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
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Input
            placeholder="Enter room's name..."
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <Mentions
            style={{ width: '100%' }}
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
