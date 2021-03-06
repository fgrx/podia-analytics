import type { PeriodMode } from "@/interfaces/types";
import dayjs, { Dayjs } from "dayjs";

const lastDayOfTheWeek = (date: string | Date) =>
  dayjs(date).day(7).endOf("day");
const firstDayOfTheWeek = (date: string | Date) =>
  dayjs(date).day(1).startOf("day");

const firstDayOfMonth = (date: string | Date) => dayjs(date).startOf("month");
const lastDayOfMonth = (date: string | Date) => dayjs(date).endOf("month");

const firstDayOfYear = (date: string | Date) => dayjs(date).startOf("year");
const lastDayOfYear = (date: string | Date) => dayjs(date).endOf("year");

const startOfDay = (date: string | Date) => dayjs(date).startOf("day");
const endOfDay = (date: string | Date) => dayjs(date).endOf("day");

const dateStart = (periodMode: PeriodMode, periodStart: string) => {
  switch (periodMode) {
    case "day":
      return startOfDay(periodStart);

    case "month":
      return firstDayOfMonth(periodStart);

    case "year":
      return firstDayOfYear(periodStart);

    default:
      return firstDayOfTheWeek(periodStart);
  }
};

const dateEnd = (periodMode: PeriodMode, periodEnd: string) => {
  switch (periodMode) {
    case "day":
      return endOfDay(periodEnd);

    case "month":
      return lastDayOfMonth(periodEnd);

    case "year":
      return lastDayOfYear(periodEnd);

    default:
      return lastDayOfTheWeek(periodEnd);
  }
};

interface IPeriod {
  dateStart: Dayjs;
  dateEnd: Dayjs;
}
const updatePeriod = (
  dateStart: Dayjs,
  dateEnd: Dayjs,
  periodMode: PeriodMode
): IPeriod => {
  switch (periodMode) {
    case "day":
      dateStart = dateStart.subtract(1, "day");
      dateEnd = dateEnd.subtract(1, "day");
      break;

    case "month":
      dateStart = dateStart.subtract(1, "month");
      dateEnd = dateEnd.subtract(1, "month");
      break;

    case "year":
      dateStart = dateStart.subtract(1, "year");
      dateEnd = dateEnd.subtract(1, "year");
      break;

    default:
      dateStart = dateStart.subtract(7, "day");
      dateEnd = dateEnd.subtract(7, "day");
      break;
  }

  return { dateStart, dateEnd };
};

const dateLabel = (
  dateStart: Dayjs,
  dateEnd: Dayjs,
  periodMode: PeriodMode
): string => {
  switch (periodMode) {
    case "day":
      return dateStart.format("dd/mm/YYYY");
    case "month":
      return dateStart.format("MMMM YYYY");
    case "year":
      return dateStart.format("YYYY");
    default:
      return (
        dateEnd.format("DD/MM/YYYY") + " - " + dateStart.format("DD/MM/YYYY")
      );
  }
};

export {
  lastDayOfTheWeek,
  firstDayOfTheWeek,
  firstDayOfMonth,
  lastDayOfMonth,
  dateLabel,
  updatePeriod,
  firstDayOfYear,
  lastDayOfYear,
  startOfDay,
  endOfDay,
  dateStart,
  dateEnd,
};
