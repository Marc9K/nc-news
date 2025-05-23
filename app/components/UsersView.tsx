import { Flex } from "antd";
import type { User } from "~/interfaces/User";
import UserCard from "./UserCard";

export default function UsersView({ users }: { users: User[] }) {
  return (
    <Flex vertical gap="middle" align="center">
      {users.map((user) => (
        <UserCard key={user.username} user={user} />
      ))}
    </Flex>
  );
}
