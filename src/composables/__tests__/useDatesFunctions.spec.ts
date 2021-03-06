import { describe, it, expect } from "vitest";

import {
  firstDayOfTheWeek,
  lastDayOfMonth,
  firstDayOfMonth,
  lastDayOfTheWeek,
  firstDayOfYear,
  lastDayOfYear,
  dateLabel,
} from "@/composables/useDatesFunctions";
import dayjs from "dayjs";

describe(">>>>>> useDatesFunctions composable", () => {
  it("should return sunday of the current week", () => {
    const currentSunday = lastDayOfTheWeek("2022-06-22");
    expect(currentSunday.format("dddd")).toBe("Sunday");
  });

  it("should return monday of the current week", () => {
    const currentSunday = firstDayOfTheWeek("2022-06-22");
    expect(currentSunday.format("dddd")).toBe("Monday");
  });

  it("should return the first day of the month", () => {
    expect(firstDayOfMonth("2022-06-22").format("DD/MM/YYYY")).toBe(
      "01/06/2022"
    );
  });

  it("should return the last day of the month", () => {
    expect(lastDayOfMonth("2022-06-22").format("DD/MM/YYYY")).toBe(
      "30/06/2022"
    );
  });

  it("should return the first day of the year", () => {
    expect(firstDayOfYear("2022-06-04").format("DD/MM/YYYY")).toBe(
      "01/01/2022"
    );
  });

  it("should return the first day of the year", () => {
    expect(lastDayOfYear("2022-08-09").format("DD/MM/YYYY")).toBe("31/12/2022");
  });

  it("should return the name of the month", () => {
    const monthWanted = "March 2022";

    const label = dateLabel(dayjs("2022-03-01"), dayjs("2022-03-31"), "month");

    expect(label).toBe(monthWanted);
  });
});
