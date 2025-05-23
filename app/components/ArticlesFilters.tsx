import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Flex, Space, type MenuProps } from "antd";
import { API } from "env";
import { useLocation, useNavigate } from "react-router";
import { useLoad } from "../hooks/useLoad";
import type { TopicType } from "../interfaces/Topic";
import useUrl from "~/hooks/useUrl";
import { NativeSelect } from "@chakra-ui/react";

type OrderType = "desc" | "asc";
type SortByType = "created_at" | "votes" | "comment_count";
interface QueryType {
  order?: OrderType;
  sort_by?: SortByType;
}

const orderOptions = [
  {
    label: "Ascending",
    key: "asc",
  },
  {
    label: "Descending",
    key: "desc",
  },
];

const sortByOptions = [
  { label: "Date", key: "created_at" },
  { label: "Likes", key: "votes" },
  { label: "Comments", key: "comment_count" },
];

function Selector({ value, placeholder, onSelect, children }) {
  return (
    <NativeSelect.Root
      variant="plain"
      colorPalette="blue"
      style={{
        width: "auto",
      }}
    >
      <NativeSelect.Field
        placeholder={placeholder}
        value={value}
        onChange={({ currentTarget: { value } }) => {
          onSelect(value);
        }}
      >
        {children}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
}

export default function ArticlesFilters() {
  const urlNavigate = useUrl();
  const navigate = useNavigate();

  const { data, error, loading } = useLoad(API + "topics");
  const topics: TopicType[] | null = data?.topics;

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

  function onClick(filter: "order" | "sort_by", key: string) {
    let query: QueryType = {
      ...urlNavigate.currentQuery,
    };
    query[filter] = key;
    navigateWith({ query });
  }
  return (
    <Flex
      vertical
      style={{ maxWidth: "45rem", width: "100%", alignItems: "center" }}
    >
      {topics?.length > 0 && (
        <NativeSelect.Root
          variant="plain"
          colorPalette="blue"
          style={{
            width: "auto",
          }}
        >
          <NativeSelect.Field
            placeholder="Select topic"
            value={urlNavigate.topic}
            onChange={({ currentTarget: { value } }) => {
              navigateWith({ path: value });
            }}
          >
            {topics?.map((topic) => (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      )}
      <Flex style={{ width: "100%", justifyContent: "space-around" }}>
        <Selector
          value={urlNavigate.currentQuery.sort_by}
          placeholder="Sort by"
          onSelect={(value) => {
            onClick("sort_by", value);
          }}
        >
          {sortByOptions.map((sort) => (
            <option key={sort.key} value={sort.key}>
              {sort.label}
            </option>
          ))}
        </Selector>

        <Selector
          value={urlNavigate.currentQuery.order}
          placeholder="Order"
          onSelect={(value) => {
            onClick("order", value);
          }}
        >
          {orderOptions.map((order) => (
            <option key={order.key} value={order.key}>
              {order.label}
            </option>
          ))}
        </Selector>
      </Flex>
    </Flex>
  );
}
