import { ArticleCard } from "./ArticleCard";
import { Flex } from "antd";
import type { ArticleType } from "../interfaces/Article";
import ArticlesFilters from "./ArticlesFilters";

export function ArticlesView({ articles }: { articles: ArticleType[] }) {
  return (
    <Flex vertical align="center" gap="middle">
      <ArticlesFilters />
      {articles.map((article: ArticleType) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </Flex>
  );
}
