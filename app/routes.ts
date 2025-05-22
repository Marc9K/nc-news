import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  ...prefix("article", [route(":id", "./routes/article.tsx")]),
  ...prefix("articles", [route(":topic?", "./routes/topic.tsx")]),
  route("/users", "./routes/users.tsx"),
] satisfies RouteConfig;
