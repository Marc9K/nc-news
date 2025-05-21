import { Articles } from "~/components/Articles";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NC News" },
    { name: "description", content: "Fake news agregator" },
  ];
}

export default function Home() {
  return <Articles />;
}
