import { cdate } from "npm:cdate";

export function startChapter(
  year: number,
  seasons: Seasons,
  chapter: Chapter
): cdate.CDate {
  const startWeek = cdate(`${year}-01-01`)
    .startOf("year")
    .add(1, "week")
    .startOf("week");

  const [first, second] = seasons;
  if (first < second) {
    // fall/winter
    return startWeek
      .add((chapter - 1) * 3, "week")
      .add((first + second) * 6, "week");
  }
  return startWeek
    .add((chapter - 1) * 3, "week")
    .add(((first % 4) + (second % 4)) * 6, "week");
}

export function endChapter(
  year: number,
  seasons: Seasons,
  chapter: Chapter
): cdate.CDate {
  const result = startChapter(year, seasons, chapter).add(3 * 7 - 1, "days");
  return result;
}

type Seasons = [Season, Season];
export enum Season {
  Spring = 1,
  Summer,
  Fall,
  Winter,
}
type Chapter = 1 | 2;

function formatChapter(year: number, seasons: Seasons, chapter: Chapter) {
  const [first, second] = seasons;
  const start = startChapter(year, seasons, chapter);
  const end = endChapter(year, seasons, chapter);
  return `[${year} ${Season[first]}/${
    Season[second]
  } Chapter ${chapter}]: ${start.format("YYYY/MM/DD")} - ${end.format(
    "YYYY/MM/DD"
  )}`;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const seasonsBase = [
    Season.Winter,
    Season.Spring,
    Season.Summer,
    Season.Fall,
    Season.Winter,
  ];
  const seasonPairs = seasonsBase
    .flatMap((v, i) => [
      [v, v],
      seasonsBase[i + 1] != null ? [v, seasonsBase[i + 1]] : null,
    ])
    .filter((e): e is Required<Seasons> => e !== null)
    .slice(0, 8);

  for (const seasons of seasonPairs) {
    if (seasons === null) continue;
    console.log(formatChapter(2024, seasons, 1));
    console.log(formatChapter(2024, seasons, 2));
  }
}
