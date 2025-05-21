import { Flex, Typography, Image } from "antd";
import Comments from "./Comments";
import { useState } from "react";
import { LikeButton } from "./LikeButton";
import type { ArticleType } from "../interfaces/Article";

export function ArticleView({ article }: { article: ArticleType }) {
  const articleEndpoint = "articles/" + article.article_id;

  const [like, setLike] = useState(0);

  return (
    <Flex
      gap="middle"
      vertical
      style={{ maxWidth: "45rem", justifySelf: "center" }}
    >
      <Typography.Title>{article.title}</Typography.Title>
      <Image src={article.article_img_url} />
      <Typography.Text>{article.body}</Typography.Text>
      <Flex justify="space-between" style={{ width: "100%" }}>
        <Typography.Text type="secondary">By {article.author}</Typography.Text>
        <Typography.Text type="secondary" style={{ textAlign: "end" }}>
          {new Date(article.created_at).toLocaleDateString("en-GB")}
        </Typography.Text>
      </Flex>
      <Flex justify="space-around" style={{ width: "100%" }}>
        <Typography.Title level={5}>
          {article.votes + like} likes
        </Typography.Title>
        <LikeButton
          like={like}
          setLike={setLike}
          value={1}
          endpoint={articleEndpoint}
        />
        <LikeButton
          setLike={setLike}
          like={like}
          value={-1}
          endpoint={articleEndpoint}
        />
      </Flex>
      <Comments articleId={article.article_id} />
    </Flex>
  );
}
