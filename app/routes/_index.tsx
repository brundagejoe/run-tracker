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
      <Title type="h1" className="mb-10">
        Half Marathon Training Plan
      </Title>
      <Text>
        You can see the progress of my training on {""}
        <a
          className="text-[#FC4C02] font-bold"
          target="_blank"
          href="https://www.strava.com/athletes/65438484"
          rel="noreferrer"
        >
          Strava
        </a>
        .
      </Text>
      <div className="flex flex-col gap-y-4 mt-4">
        {data.map((day) => (
          <div
            key={day.date}
            className="flex items-start gap-x-10 border rounded-xl justify-between py-2 px-4"
          >
            <Text>
              {day.weekday} <br />
              {day.date}
            </Text>
            <Text>{day.event}</Text>
          </div>
        ))}
      </div>
    </div>
  );
}
