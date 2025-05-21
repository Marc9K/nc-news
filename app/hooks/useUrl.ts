import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router";
import type { TopicType } from "~/interfaces/Topic";
import { useLoad } from "./useLoad";
import { API } from "env";

type OrderType = "desc" | "asc";
type SortByType = "created_at" | "votes" | "comment_count";
interface QueryType {
  order?: OrderType;
  sort_by?: SortByType;
  page?: number;
  limit?: number;
}

export default function useUrl() {
  const navigate = useNavigate();
  const location = useLocation();
  const lastSegment = location.pathname.split("/").pop() ?? "";
  const params = new URLSearchParams(location.search);
  const queryAttributes = ["sort_by", "order", "page", "limit"];
  const currentQuery: QueryType = queryAttributes.reduce((prev, current) => {
    const attribute = params.get(current);
    if (attribute) {
      const copy = { ...prev };
      copy[current] = params.get(current);
      return copy;
    }
    return prev;
  }, {});

  const { data, error, loading } = useLoad(API + "topics");
  const topics: MenuProps["items"] =
    data?.topics.map((topic: TopicType) => ({
      label: topic.slug,
      key: topic.slug,
    })) ?? [];

  const topic = topics?.map((topic) => topic?.key)?.includes(lastSegment)
    ? lastSegment
    : "";

  function navigateWith(query: QueryType) {
    const newParams = new URLSearchParams({ ...currentQuery, ...query });
    const postfix = newParams.toString();
    navigate(
      `/articles${topic.length > 0 ? "/" + topic : ""}${
        postfix.length > 0 ? "?" : ""
      }` + postfix
    );
  }
  return { navigate: navigateWith, currentQuery, topic };
}
