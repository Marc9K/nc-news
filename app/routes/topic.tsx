import { API } from "env";
import { ArticlesView } from "../components/ArticlesView";
import { MetaWraper } from "../components/MetaWraper";
import { useLoad } from "../hooks/useLoad";
import type { Route } from "./+types/topic";
import { useLocation, useNavigate } from "react-router";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {}

export default function Topic({ params }: Route.ComponentProps) {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const sort_by = query.get("sort_by");
  const order = query.get("order");
  const p = query.get("p");
  const limit = query.get("limit");

  const { data, error, loading } = useLoad(
    API + "articles",
    [params.topic, sort_by, order, p, limit],
    {
      topic: params.topic,
      sort_by,
      order,
      p,
      limit,
    }
  );

  return (
    <MetaWraper loading={loading} error={error}>
      {data && (
        <ArticlesView articles={data.articles} total={data.total_count} />
      )}
    </MetaWraper>
  );
}
