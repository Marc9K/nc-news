import { useLoad } from "~/hooks/useLoad";
import { API } from "../../env";
import { MetaWraper } from "../components/MetaWraper";
import type { Route } from "./+types/Article";
import { ArticleView } from "~/components/ArticleView";

export async function loader({ params }: Route.LoaderArgs) {}

export default function Article({ params }: Route.ComponentProps) {
  const url = API + "articles/" + params.id;
  const { data, error, loading } = useLoad(url);

  return (
    <MetaWraper loading={loading} error={error}>
      {data && <ArticleView article={data.article} />}
    </MetaWraper>
  );
}
