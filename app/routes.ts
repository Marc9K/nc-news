import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  ...prefix("article", [route(":id", "./routes/article.tsx")]),
  ...prefix("articles", [
    // index("./routes/home.tsx"),
    route(":topic", "./routes/topic.tsx"),
  ]),
] satisfies RouteConfig;
