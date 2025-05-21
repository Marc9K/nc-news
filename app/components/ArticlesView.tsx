import { ArticleCard } from "./ArticleCard";
import { Flex } from "antd";
import type { ArticleType } from "~/interfaces/Article";

export function Articles({ articles }: { articles: ArticleType[] }) {
  return (
    <Flex vertical align="center" gap="middle">
      {articles.map((article: ArticleType) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </Flex>
  );
}
