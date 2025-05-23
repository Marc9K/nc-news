import { Avatar, Button, Flex, Typography } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "~/userContext";

export function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <Flex
      style={{
        width: "100%",
        position: "relative",
        alignItems: "center",
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
    >
      <Button
        aria-label="Go to homepage"
        type="text"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          margin: 0,
        }}
        onClick={() => navigate("/")}
      >
        <Typography.Title level={1}>NC News</Typography.Title>
      </Button>
      {user ? (
        <Flex
          vertical
          align="center"
          style={{ marginLeft: "auto", marginRight: "16px" }}
          onClick={() => navigate("/users")}
        >
          <Avatar
            size="small"
            src={user.avatar_url}
            alt={`${user.name}s avatar`}
          />
          <Typography.Text type="secondary">{user.username}</Typography.Text>
        </Flex>
      ) : (
        <Button
          type="dashed"
          size="small"
          style={{ marginLeft: "auto", marginRight: "16px" }}
          onClick={() => navigate("/users")}
        >
          Log in
        </Button>
      )}
    </Flex>
  );
}
