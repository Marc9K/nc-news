import { Button, Flex, Image, Typography } from "antd";
import { useLoad } from "~/hooks/useLoad";
import API from "../../env";
import { MetaWraper } from "./MetaWraper";
// import type { Route } from "./+types/Article";
// import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
// import { Input } from "antd";
import { Comment } from "./Comment";

// const { TextArea } = Input;

export default function Comments({ id }) {
  const url = API + "articles/" + id;
  const { data, error, loading } = useLoad(url + "/comments");

  return (
    <Flex vertical align="center" gap="middle">
      {/* <TextArea placeholder="Comment here..." autoSize />
      <Button type="primary">Comment</Button> */}
      <MetaWraper loading={loading} error={error}>
        {data && (
          <>
            {data.comments.map((comment) => (
              <Comment key={comment.comment_id} comment={comment} />
            ))}
          </>
        )}
      </MetaWraper>
    </Flex>
  );
}
