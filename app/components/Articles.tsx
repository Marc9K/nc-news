import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Flex, Spin, Typography } from "antd";
import axios from "axios";
import API from "../../env";
import { useLoad } from "~/hooks/useLoad";
import { MetaWraper } from "./MetaWraper";

export function Articles() {
  const { data, error, loading } = useLoad(API + "articles");

  return (
    <MetaWraper loading={loading} error={error}>
      <Flex vertical align="center" gap="middle">
        {data &&
          data.articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
      </Flex>
    </MetaWraper>
  );
}
