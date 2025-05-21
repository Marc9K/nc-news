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
  const page = query.get("page");
  const limit = query.get("page_size");

  const { data, error, loading } = useLoad(
    API + "articles",
    [params.topic, sort_by, order],
    {
      topic: params.topic,
      sort_by,
      order,
      page,
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
