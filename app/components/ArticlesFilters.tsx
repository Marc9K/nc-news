import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, type MenuProps } from "antd";
import { API } from "env";
import { useLocation, useNavigate } from "react-router";
import { useLoad } from "~/hooks/useLoad";
import type { TopicType } from "~/interfaces/Topic";

export default function ArticlesFilters() {
  const navigate = useNavigate();
  const location = useLocation();
  const lastSegment = location.pathname.split("/").pop();

  const { data, error, loading } = useLoad(API + "topics");
  const topics: MenuProps["items"] =
    data?.topics.map((topic: TopicType) => ({
      label: topic.slug,
      key: topic.slug,
    })) ?? [];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    navigate("/articles/" + key);
  };
  return (
    <>
      {topics!.length > 0 && (
        <Dropdown menu={{ items: topics, onClick }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {topics?.map((topic) => topic?.key)?.includes(lastSegment)
                ? lastSegment
                : "Select topic"}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      )}
    </>
  );
}
