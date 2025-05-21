import { API } from "env";
import { ArticlesView } from "~/components/ArticlesView";
import { MetaWraper } from "~/components/MetaWraper";
import { useLoad } from "~/hooks/useLoad";
import type { Route } from "./+types/topic";
import { useLocation, useNavigate } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {}

export default function Topic({ params }: Route.ComponentProps) {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const sort_by = query.get("sort_by");
  const order = query.get("order");

  const { data, error, loading } = useLoad(
    API + "articles",
    [params.topic, sort_by, order],
    {
      topic: params.topic,
      sort_by,
      order,
    }
  );
  return (
    <MetaWraper loading={loading} error={error}>
      {data && <ArticlesView articles={data.articles} />}
    </MetaWraper>
  );
}
