import React, { useContext, useEffect } from 'react';
import { Avatar, Comment, List, Skeleton, Tooltip, Typography } from 'antd';
import moment from 'moment';

import { UserContext } from '../../../contexts/UserProvider';
import { UserOutlined } from '@ant-design/icons';

function Message({ className, messages, loading }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    document
      .querySelector('.' + className)
      .scrollTo(0, document.querySelector('.' + className).scrollHeight);
  }, [messages, className]);

  const commentProps = (item) => ({
    style: { textAlign: item.userId === user._id ? 'right' : '' },
    avatar:
      item.userId === user._id ? (
        ''
      ) : (
        <Tooltip
          placement="left"
          title={
            <Typography.Text style={{ color: '#fff' }}>
              {item.user?.username}
            </Typography.Text>
          }
        >
          <Avatar
            src={item.user?.avatar}
            icon={!item.user?.avatar && <UserOutlined />}
            size="default"
          />
        </Tooltip>
      ),
    content: (
      <Tooltip
        placement="left"
        title={
          <Typography.Text style={{ color: '#fff' }}>
            {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
          </Typography.Text>
        }
      >
        <Typography.Text
          style={{
            backgroundColor: '#e4e6eb',
            padding: '4px 12px',
            borderRadius: '20px',
            display: 'inline-block',
            maxWidth: '40%',
            textAlign: 'left'
          }}
        >
          {item.content}
        </Typography.Text>
      </Tooltip>
    ),
  });

  return (
    <List
      className={className}
      itemLayout="horizontal"
      dataSource={messages}
      rowKey={(item) => item._id}
      renderItem={(item) => (
        <Skeleton loading={loading} active avatar>
          <li>
            <Comment {...commentProps(item)} />
          </li>
        </Skeleton>
      )}
    />
  );
}

export default React.memo(Message);
