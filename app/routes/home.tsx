import { Articles } from "~/components/Articles";
import type { Route } from "./+types/home";
import { Header } from "~/components/Header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NC News" },
    { name: "description", content: "Fake news agregator" },
  ];
}

export default function Home() {
  return (
    <main>
      <header>
        <Header />
      </header>
      <Articles />
    </main>
  );
}
