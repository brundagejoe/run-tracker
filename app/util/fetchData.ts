import { z } from "zod";

const SPREADSHEET_ID = "1Wza2DCA64LEVYjlJaJG66Vg74Bp1YNW-8P0-vDWReHw";
const API_KEY = "AIzaSyCsXaTyy3YAksI4molYgTpAwzyN9gBm6VE";

const ResultSchema = z.object({
  values: z.array(
    z.array(z.string()).transform((value) => {
      return {
        weekday: value[0],
        date: value[1],
        event: value[2],
      };
    })
  ),
});

export async function fetchData() {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Schedule!R2C1:R1000C27?key=${API_KEY}`
  );
  const data = await response.json();

  const parsedData = ResultSchema.parse(data);

  return parsedData.values;
}
