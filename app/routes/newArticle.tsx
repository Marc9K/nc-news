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
import TopicSelector from "~/components/TopicSelector";
import { useLoad } from "~/hooks/useLoad";
import type { TopicType } from "~/interfaces/Topic";
import { AuthContext } from "~/userContext";

export default function NewArticle() {
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
      <Form
        onFinish={async (values) => {
          try {
            if (values.newTopic) {
              values.topic = values.newTopic;
              delete values.newTopic;
            }
            values.author = user?.username;

            console.log(values);

            await axios.post(API + "articles", values);
            navigate("/");
          } catch (err) {
            errorMessage();
          }
        }}
      >
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
                {/* <Option value={0}>
                  <Typography.Text type="secondary">New topic</Typography.Text>
                </Option> */}
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
          <Form.Item name="newTopic" label="Name new topic">
            <Input />
          </Form.Item>
        )}
        <Form.Item
          name="body"
          label="Article text"
          rules={[{ required: true, type: "string", min: 1 }]}
        >
          <Input.TextArea autoSize />
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
