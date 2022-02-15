import React, { useEffect } from 'react';
import { Avatar, Comment, List, Tooltip, Typography } from 'antd';
import moment from 'moment';

function Message({ className, messages }) {
  useEffect(() => {
    document
      .querySelector('.' + className)
      .scrollTo(0, document.querySelector('.' + className).scrollHeight);
  }, [messages, className]);

  return (
    <List
      className={className}
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(item) => (
        <li key={item._id}>
          <Comment
            avatar={
              <Tooltip placement="left" title={item.user?.username}>
                <Avatar src={item.user?.avatar} size="default" />
              </Tooltip>
            }
            content={
              <Tooltip
                placement="left"
                title={moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
              >
                <Typography.Text
                  style={{
                    backgroundColor: '#e4e6eb',
                    padding: '4px 12px',
                    borderRadius: '20px',
                  }}
                >
                  {item.content}
                </Typography.Text>
              </Tooltip>
            }
          />
        </li>
      )}
    />
  );
}

export default Message;
