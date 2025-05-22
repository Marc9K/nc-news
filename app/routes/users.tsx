import { API } from "env";
import { MetaWraper } from "~/components/MetaWraper";
import UsersView from "~/components/UsersView";
import { useLoad } from "~/hooks/useLoad";

export default function Users() {
  const { data, error, loading } = useLoad(API + "users");
  return (
    <MetaWraper loading={loading} error={error}>
      {data && <UsersView users={data.users} />}
    </MetaWraper>
  );
}
