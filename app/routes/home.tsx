import { ArticlesView } from "../components/ArticlesView";
import { API } from "../../env";
import type { Route } from "./+types/home";
import { MetaWraper } from "../components/MetaWraper";
import { useLoad } from "../hooks/useLoad";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NC News" },
    { name: "description", content: "Fake news agregator" },
  ];
}

export default function Home() {
  const { data, error, loading } = useLoad(API + "articles");
  return (
    <MetaWraper loading={loading} error={error}>
      {data && (
        <ArticlesView articles={data.articles} total={data.total_count} />
      )}
    </MetaWraper>
  );
}
