import { ArticleCard } from "./ArticleCard";
import { Flex, FloatButton, Pagination, type PaginationProps } from "antd";
import type { ArticleType } from "../interfaces/Article";
import ArticlesFilters from "./ArticlesFilters";
import useUrl from "~/hooks/useUrl";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "~/userContext";

export function ArticlesView({
  articles,
  total,
}: {
  articles: ArticleType[];
  total: number;
}) {
  const urlNavigate = useUrl();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <Flex vertical align="center" gap="middle">
      {user && (
        <FloatButton
          icon={<PlusOutlined />}
          onClick={() => {
            navigate("/articles/new");
          }}
        />
      )}
      <ArticlesFilters />
      {articles.map((article: ArticleType) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
      {total > (urlNavigate.currentQuery.limit ?? 10) && (
        <Pagination
          onChange={(p, limit) => {
            urlNavigate.navigate({ p, limit });
          }}
          total={total}
          showSizeChanger
          showQuickJumper
          current={urlNavigate.currentQuery.p ?? 1}
          pageSize={urlNavigate.currentQuery.limit ?? 10}
        />
      )}
    </Flex>
  );
}
