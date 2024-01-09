import { assertEquals } from "https://deno.land/std@0.202.0/assert/mod.ts";
import { Season, endChapter, startChapter } from "./main.ts";
import { cdate } from "npm:cdate";

function assertCdate(actual: cdate.CDate, expected: cdate.CDate) {
  assertEquals(actual.toDate(), expected.toDate());
}

Deno.test(function startChapterTest() {
  assertCdate(
    startChapter(2024, [Season.Winter, Season.Winter], 1),
    cdate("2024-01-07")
  );
  assertCdate(
    startChapter(2024, [Season.Winter, Season.Winter], 2),
    cdate("2024-01-28")
  );
  assertCdate(
    startChapter(2024, [Season.Winter, Season.Spring], 1),
    cdate("2024-02-18")
  );
  assertCdate(
    startChapter(2024, [Season.Spring, Season.Summer], 1),
    cdate("2024-05-12")
  );
});

Deno.test(function endChapterTest() {
  assertCdate(
    endChapter(2024, [Season.Winter, Season.Winter], 1),
    cdate("2024-01-27")
  );
  assertCdate(
    endChapter(2024, [Season.Winter, Season.Winter], 2),
    cdate("2024-02-17")
  );
  assertCdate(
    endChapter(2024, [Season.Winter, Season.Spring], 1),
    cdate("2024-03-09")
  );
  assertCdate(
    endChapter(2024, [Season.Spring, Season.Summer], 1),
    cdate("2024-06-01")
  );
});
