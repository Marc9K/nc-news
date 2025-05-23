import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Header } from "./components/Header";
import { ConfigProvider, Flex, Spin, Typography, theme } from "antd";
import { useEffect, useState } from "react";
import type { User } from "./interfaces/User";
import { AuthContext } from "./userContext";
import { Provider as ChakraProvider } from "./components/ui/provider";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader() {
  return {
    version: 0.1,
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        const isDark = e.matches;
        setIsDark(isDark);
      });
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="./favicon.png" />
        <Meta />
        <Links />
      </head>
      <ChakraProvider>
        <ConfigProvider
          theme={{
            algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}
        >
          <AuthContext.Provider value={{ user, setUser }}>
            <body style={{ padding: "0 1rem" }}>
              <main>
                <header>
                  <Header />
                </header>
                <div className="p-4">{children}</div>
              </main>
              <ScrollRestoration />
              <Scripts />
            </body>
          </AuthContext.Provider>
        </ConfigProvider>
      </ChakraProvider>
    </html>
  );
}

export function HydrateFallback({ loaderData }: Route.ComponentProps) {
  return (
    <Flex vertical align="center">
      <Spin size="large" />
    </Flex>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <Typography.Title level={1} type="danger">
        {message}
      </Typography.Title>
      <Typography.Text strong type="danger">
        {details}
      </Typography.Text>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
