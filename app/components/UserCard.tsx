import { Avatar, Button, Card, Flex, Image, Typography } from "antd";
import { use, useContext } from "react";
import type { User } from "~/interfaces/User";
import { AuthContext } from "~/userContext";
export default function UserCard({ user }: { user: User }) {
  const auth = useContext(AuthContext);
  return (
    <Card
      style={{
        maxWidth: "30rem",
        width: "100%",
      }}
      title={
        <Typography.Title level={3} style={{ whiteSpace: "wrap" }}>
          {user.name}
        </Typography.Title>
      }
      actions={[
        <Typography>{user.username}</Typography>,
        auth.user?.username === user.username ? (
          <Button
            variant="solid"
            color="danger"
            onClick={() => {
              auth.setUser(null);
            }}
          >
            Sign out
          </Button>
        ) : (
          <Button
            type="text"
            onClick={() => {
              auth.setUser(user);
            }}
          >
            Sign in
          </Button>
        ),
      ]}
    >
      <Flex justify="center">
        <Avatar
          shape="square"
          size={150}
          src={user.avatar_url}
          alt={`${user.name}s avatar`}
        />
      </Flex>
    </Card>
  );
}
