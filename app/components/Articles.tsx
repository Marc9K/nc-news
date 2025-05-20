import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Flex, Spin, Typography } from "antd";
import axios from "axios";
import API from "../../env";
import { useLoad } from "~/hooks/useLoad";

export function Articles() {
  const { data, error, loading } = useLoad(API + "articles");

  if (loading) {
    return (
      <Flex vertical align="center">
        <Spin size="large" />
      </Flex>
    );
  }

  if (error) {
    return <Typography.Text>{error}</Typography.Text>;
  }

  const { articles } = data;

  return (
    <Flex vertical align="center">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </Flex>
  );
}
