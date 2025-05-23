import {
  Button,
  Form,
  Input,
  Select,
  Image,
  Flex,
  Typography,
  message,
  Space,
} from "antd";
import axios from "axios";
import { API } from "env";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { MetaWraper } from "~/components/MetaWraper";
import { useLoad } from "~/hooks/useLoad";
import type { TopicType } from "~/interfaces/Topic";
import { AuthContext } from "~/userContext";

export default function NewArticle() {
  async function create(slug: string, description: string = "No description") {
    await axios.post(API + "topics", { slug, description });
  }

  async function post(article: {
    newTopic?: string;
    newTopicDescription?: string;
    body: string;
    title: string;
    article_img_url?: string;
    topic: string;
  }) {
    try {
      if (article.newTopic) {
        await create(article.newTopic, article.newTopicDescription);
        article.topic = article.newTopic;
        delete article.newTopic;
        delete article.newTopicDescription;
      }
      article.author = user?.username;

      console.log(article);

      await axios.post(API + "articles", article);
      navigate("/");
    } catch (err) {
      errorMessage();
    }
  }

  const { data, error, loading } = useLoad(API + "topics");
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [image, setImage] = useState(null);

  const { user } = useContext(AuthContext);
  if (user?.username) {
    var author = user.username;
  } else {
    navigate("/");
  }

  const [messageApi, contextHolder] = message.useMessage();

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "Couldn't post your article, sorry",
    });
  };

  return (
    <Flex vertical align="center">
      <Typography.Title level={2}>New article</Typography.Title>
      <Form onFinish={post} style={{ maxWidth: "40rem", width: "100%" }}>
        {contextHolder}
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, type: "string", min: 1 }]}
        >
          <Input />
        </Form.Item>
        {image && (
          <Flex justify="center">
            <Image src={image} alt="Article image" height={300} />
          </Flex>
        )}
        <Form.Item
          name="article_img_url"
          label="Image link"
          rules={[{ type: "url" }]}
        >
          <Input
            allowClear
            onChange={({ target: { value } }) => {
              setImage(value ? value : null);
            }}
          />
        </Form.Item>
        <MetaWraper loading={loading} error={error}>
          {data && (
            <Form.Item name="topic" label="Topic" rules={[{ required: true }]}>
              <Select
                placeholder="Select a topic for your article"
                onChange={setTopic}
                value={topic}
                allowClear
              >
                <Option value={0}>
                  <Typography.Text type="secondary">New topic</Typography.Text>
                </Option>
                {data.topics?.length > 0 &&
                  data.topics.map((topic: TopicType) => (
                    <Option value={topic.slug}>
                      {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          )}
        </MetaWraper>
        {topic === 0 && (
          <>
            <Form.Item
              name="newTopic"
              label="Name new topic"
              rules={[{ required: topic === 0, type: "string", min: 1 }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="newTopicDescription" label="Describe new topic">
              <Input />
            </Form.Item>
          </>
        )}
        <Form.Item
          name="body"
          label="Article text"
          rules={[{ required: true, type: "string", min: 1 }]}
        >
          <Input.TextArea autoSize variant="underlined" />
        </Form.Item>
        <Form.Item label={null}>
          <Button block type="primary" htmlType="submit">
            Post
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
