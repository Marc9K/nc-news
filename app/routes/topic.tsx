import { API } from "env";
import { ArticlesView } from "~/components/ArticlesView";
import { MetaWraper } from "~/components/MetaWraper";
import { useLoad } from "~/hooks/useLoad";
import type { Route } from "./+types/topic";

export async function loader({ params }: Route.LoaderArgs) {}

export default function Topic({ params }: Route.ComponentProps) {
  const { data, error, loading } = useLoad(API + "articles", [params.topic], {
    topic: params.topic,
  });
  return (
    <MetaWraper loading={loading} error={error}>
      {data && <ArticlesView articles={data.articles} />}
    </MetaWraper>
  );
}
