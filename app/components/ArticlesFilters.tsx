import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Flex, Space, type MenuProps } from "antd";
import { API } from "env";
import { useLocation, useNavigate } from "react-router";
import { useLoad } from "../hooks/useLoad";
import type { TopicType } from "../interfaces/Topic";
import useUrl from "~/hooks/useUrl";

type OrderType = "desc" | "asc";
type SortByType = "created_at" | "votes" | "comment_count";
interface QueryType {
  order?: OrderType;
  sort_by?: SortByType;
}

const orderOptions: MenuProps["items"] = [
  {
    label: "Ascending",
    key: "asc",
  },
  {
    label: "Descending",
    key: "desc",
  },
];

const sortByOptions: MenuProps["items"] = [
  { label: "Date", key: "created_at" },
  { label: "Likes", key: "votes" },
  { label: "Comments", key: "comment_count" },
];

export default function ArticlesFilters() {
  const urlNavigate = useUrl();
  const navigate = useNavigate();

  const { data, error, loading } = useLoad(API + "topics");
  const topics: MenuProps["items"] =
    data?.topics.map((topic: TopicType) => ({
      label: topic.slug,
      key: topic.slug,
    })) ?? [];

  const onClickTopic: MenuProps["onClick"] = ({ key }) => {
    navigateWith({ path: key });
  };

  function navigateWith({
    query = urlNavigate.currentQuery,
    path = urlNavigate.topic,
  }: {
    query: QueryType;
    path: string;
  }) {
    const params = new URLSearchParams(query);
    const postfix = params.toString();
    navigate(
      `/articles${path.length > 0 ? "/" + path : ""}${
        postfix.length > 0 ? "?" : ""
      }` + postfix
    );
  }

  function onClick(filter: "order" | "sort_by") {
    const action: MenuProps["onClick"] = ({ key }) => {
      let query: QueryType = {
        ...urlNavigate.currentQuery,
      };
      query[filter] = key;
      navigateWith({ query });
    };
    return action;
  }
  return (
    <Flex vertical style={{ width: "100%", alignItems: "center" }}>
      {topics!.length > 0 && (
        <Dropdown menu={{ items: topics, onClick: onClickTopic }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {urlNavigate.topic.length > 0
                ? urlNavigate.topic
                : "Select topic"}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      )}
      <Flex style={{ width: "100%", justifyContent: "space-around" }}>
        <Dropdown menu={{ items: sortByOptions, onClick: onClick("sort_by") }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {urlNavigate.currentQuery.sort_by
                ? sortByOptions.find(
                    ({ key }) => key === urlNavigate.currentQuery.sort_by
                  ).label ?? urlNavigate.currentQuery.sort_by
                : "Sort by"}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <Dropdown menu={{ items: orderOptions, onClick: onClick("order") }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {urlNavigate.currentQuery.order
                ? orderOptions.find(
                    ({ key }) => key === urlNavigate.currentQuery.order
                  ).label ?? urlNavigate.currentQuery.order
                : "Order"}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Flex>
    </Flex>
  );
}
