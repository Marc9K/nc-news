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
        className="deadCentre"
        onClick={() => navigate("/")}
      >
        <Typography.Title level={1}>NC News</Typography.Title>
      </Button>
      {user ? (
        <Button
          type="text"
          className="offRight"
          onClick={() => navigate("/users")}
        >
          <Flex vertical align="center">
            <Avatar
              size="small"
              src={user.avatar_url}
              alt={`${user.name}s avatar`}
            />
            <Typography.Text type="secondary">{user.username}</Typography.Text>
          </Flex>
        </Button>
      ) : (
        <Button
          type="dashed"
          size="small"
          className="offRight"
          onClick={() => navigate("/users")}
        >
          Log in
        </Button>
      )}
    </Flex>
  );
}
