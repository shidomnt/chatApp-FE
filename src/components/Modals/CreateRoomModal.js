import React, { useContext, useState } from 'react';
import { Modal, Input, Button, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons'

import { AppContext } from '../../contexts/AppProvider'

const CreateRoomModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomName, setRoomName] = useState('')
  const [friendName, setFriendName] = useState('')

  const { createRoom } = useContext(AppContext);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if(roomName) {
      createRoom({name: roomName});
    }
    setRoomName('');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setRoomName('');
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="default" shape="circle" icon={<EditOutlined />} onClick={showModal} />
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Space direction="vertical" size="large" style={{width: '100%'}}>
          <Input placeholder="Enter room's name..." value={roomName} onChange={(e) => setRoomName(e.target.value)} />
          {/* <Input placeholder="Enter friend's name..." value={friendName} onChange={(e) => setFriendName(e.target.value)} /> */}
        </Space>
      </Modal>
    </>
  );
};

export default CreateRoomModal;
