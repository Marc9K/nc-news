import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  ...prefix("article", [
    // index("./routes/Article.tsx"),
    route(":id", "./routes/Article.tsx"),
  ]),
] satisfies RouteConfig;
