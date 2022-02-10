import React from 'react';
import { Avatar, Comment, List, Tooltip, Typography } from 'antd';

function Message({ className, messages }) {
  return (
    <List
      className={className}
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(item) => (
        <li>
          <Comment
            avatar={
              <Tooltip placement="left" title={item.username}>
                <Avatar src="item.avatar" size="default" />
              </Tooltip>
            }
            content={
              <Tooltip placement="left" title={item.createAt}>
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
