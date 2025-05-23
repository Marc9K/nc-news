import { Flex, Typography, Image, Button } from "antd";
import Comments from "./Comments";
import { useContext, useState } from "react";
import { LikeButton } from "./LikeButton";
import type { ArticleType } from "../interfaces/Article";
import DeleteButton from "./DeleteButton";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "~/userContext";
import { API } from "env";

export function ArticleView({ article }: { article: ArticleType }) {
  const articleEndpoint = "articles/" + article.article_id;

  const [like, setLike] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  return (
    <Flex
      gap="middle"
      vertical
      style={{ maxWidth: "45rem", justifySelf: "center" }}
    >
      <Typography.Title>{article.title}</Typography.Title>
      <Image src={article.article_img_url} alt="Article image" />
      <Typography.Text>{article.body}</Typography.Text>
      <Flex justify="space-between" style={{ width: "100%" }}>
        <Typography.Text type="secondary">By {article.author}</Typography.Text>
        <Typography.Text type="secondary" style={{ textAlign: "end" }}>
          {new Date(article.created_at).toLocaleDateString("en-GB")}
        </Typography.Text>
      </Flex>
      <Flex justify="space-around" style={{ width: "100%" }}>
        <Typography.Title level={5}>
          {article.votes + like} like
          {Math.abs(article.votes + like) !== 1 && "s"}
        </Typography.Title>
        {article.author === user?.username ? (
          <DeleteButton
            deleting={deleting}
            onClick={async () => {
              try {
                setDeleting(true);
                await axios.delete(API + articleEndpoint);
                navigate("/");
              } catch (error) {
                setDeleting(false);
                throw error;
              }
            }}
          />
        ) : (
          <>
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
          </>
        )}
      </Flex>
      <Comments articleId={article.article_id} />
    </Flex>
  );
}
