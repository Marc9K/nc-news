import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NC News" },
    { name: "description", content: "Fake news agregator" },
  ];
}

export default function Home() {
  return <Welcome />;
}
