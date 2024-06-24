import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export function clientLoader() {
  return {
    message: "Loading stuff goes here",
  };
}

export default function Index() {
  const { message } = useLoaderData<typeof clientLoader>();
  return (
    <div className="font-sans p-4">
      <h1>{message}</h1>
    </div>
  );
}
