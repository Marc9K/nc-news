import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Flex } from "antd";
import axios from "axios";

async function loadArticles(setArticles) {
  try {
    const {
      data: { articles },
    } = await axios.get("https://nc-news-782p.onrender.com/api/articles");

    setArticles(articles);
  } catch (error) {
    console.log(error);
  }
}

export function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadArticles(setArticles);
  });

  return (
    <Flex vertical align="center">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </Flex>
  );
}
