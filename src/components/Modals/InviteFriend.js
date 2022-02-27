import React, { useEffect, useState } from 'react';
import { Modal, Button, Space, Typography, Mentions, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';

import { apiConfig, apiUrl } from '../../contexts/constants';
import { useParams } from 'react-router-dom';
import { invite } from '../../contexts/action';
import { useUserContext } from '../../hooks';

const InviteFriend = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [friendName, setFriendName] = useState('');
  const { roomId } = useParams();

  const { user } = useUserContext();

  useEffect(() => {
    if (isModalVisible && roomId) {
      Promise.all([
        axios.get(`${apiUrl}/users/`, apiConfig()),
        axios.post(`${apiUrl}/users/filter`, { roomId }, apiConfig()),
      ]).then(([allFriend, friendInRoom]) => {
        const friendNameInRoom = friendInRoom.data.map(
          (friend) => friend.username
        );
        setFriendList(
          allFriend.data.filter(({ username }) => {
            return !friendNameInRoom.includes(username);
          })
        );
      });
    }
  }, [isModalVisible, roomId]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (friendName) {
      setIsModalVisible(false);
      await invite({
        roomId: roomId,
        friendNameList: friendName
          .split('@')
          .map((item) => item.trim())
          .filter((item) => item),
      });

      setFriendName('');
      message.success('Invite successfully!');
    } else {
      message.error('Please fill in all the field!');
    }
  };

  const handleCancel = () => {
    setFriendName('');
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        type="default"
        shape="circle"
        icon={<UserAddOutlined />}
        onClick={showModal}
      />
      <Modal
        title={<Typography.Title level={5}>Invite Friend</Typography.Title>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
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

export default InviteFriend;
