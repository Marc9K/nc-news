import { ArticleCard } from "./ArticleCard";
import { Flex, Pagination, type PaginationProps } from "antd";
import type { ArticleType } from "../interfaces/Article";
import ArticlesFilters from "./ArticlesFilters";
import useUrl from "~/hooks/useUrl";

export function ArticlesView({
  articles,
  total,
}: {
  articles: ArticleType[];
  total: number;
}) {
  const urlNavigate = useUrl();
  return (
    <Flex vertical align="center" gap="middle">
      <ArticlesFilters />
      {articles.map((article: ArticleType) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
      {total > (urlNavigate.currentQuery.limit ?? 10) && (
        <Pagination
          onChange={(page, limit) => {
            urlNavigate.navigate({ page, limit });
          }}
          total={total}
          showSizeChanger
          showQuickJumper
          current={urlNavigate.currentQuery.page ?? 1}
          pageSize={urlNavigate.currentQuery.limit ?? 10}
        />
      )}
    </Flex>
  );
}
