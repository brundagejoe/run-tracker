import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Title, Text } from "~/UI/Typography";
import { fetchData } from "~/util/fetchData";

export const meta: MetaFunction = () => {
  return [
    { title: "Half Marathon Plan" },
    {
      name: "description",
      content:
        "Joe Brundage's training plan for a half marathon on September 21st",
    },
  ];
};

export async function clientLoader() {
  const data = await fetchData();

  return {
    data,
  };
}

export default function Index() {
  const { data } = useLoaderData<typeof clientLoader>();
  return (
    <div className="font-sans p-4 flex flex-col items-center">
      <Title type="h1">Half Marathon training plan</Title>
      <div className="flex flex-col gap-y-4 w-[256px] mt-10">
        {data.map((day) => (
          <div
            key={day.date}
            className="flex items-start gap-x-4 border rounded-xl justify-between p-2"
          >
            <div className="flex flex-col gap-y-1">
              <Text>{day.weekday}</Text>
              <Text>{day.date}</Text>
            </div>
            <Text>{day.event}</Text>
          </div>
        ))}
      </div>
    </div>
  );
}
