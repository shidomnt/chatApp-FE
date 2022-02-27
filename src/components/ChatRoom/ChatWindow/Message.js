import React, { useEffect } from "react";
import {
  Avatar,
  Comment,
  List,
  Skeleton,
  Tooltip,
  Typography,
  Button,
  message,
} from "antd";
import moment from "moment";

import { UserOutlined, EllipsisOutlined } from "@ant-design/icons";
import { deleteMessage } from "../../../contexts/action";
import { useUserContext } from "../../../hooks";

function Message({ className, messages, loading }) {
  const { user } = useUserContext();

  useEffect(() => {
    document
      .querySelector("." + className)
      .scrollTo(0, document.querySelector("." + className).scrollHeight);
  }, [messages, className]);
  const hanleDeleteMessage = async (body) => {
    if (body.userId === user._id) {
      await deleteMessage(body);
      message.success("message deleted");
    } else {
      message.error("This message is not yours");
    }
  };

  const commentProps = (item) => ({
    style: { textAlign: item.userId === user._id ? "right" : "" },
    avatar:
      item.userId === user._id ? (
        ""
      ) : (
        <Tooltip
          placement="left"
          title={
            <>
              <Typography.Text style={{ color: "#fff" }}>
                {item.user?.username}
              </Typography.Text>
            </>
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
        placement="right"
        title={
          <Button
            onClick={() => {
              hanleDeleteMessage({
                userId: item.userId,
                idMessage: item._id,
                roomId: item.roomId,
              });
            }}
          >
            <EllipsisOutlined />
          </Button>
        }
      >
        <Tooltip
          placement={item.userId === user._id ? "top" : "left"}
          title={
            <>
              <Typography.Text style={{ color: "#fff" }}>
                {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </Typography.Text>
            </>
          }
        >
          <Typography.Text
            style={{
              backgroundColor: "#e4e6eb",
              padding: "4px 12px",
              borderRadius: "20px",
              display: "inline-block",
              maxWidth: "40%",
              textAlign: "left",
            }}
          >
            {item.content}
          </Typography.Text>
        </Tooltip>
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
