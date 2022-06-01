import dayjs, { Dayjs } from "dayjs";

const lastDayOfTheWeek = () => dayjs().day(7).endOf("day");
const firstDayOfTheWeek = () => dayjs().day(1).startOf("day");

const firstDayOfMonth = (date: string | Date) => dayjs(date).startOf("month");
const lastDayOfMonth = (date: string | Date) => dayjs(date).endOf("month");

interface IPeriod {
  dateStart: Dayjs;
  dateEnd: Dayjs;
}
const updatePeriod = (
  dateStart: Dayjs,
  dateEnd: Dayjs,
  periodType: "week" | "month"
): IPeriod => {
  if (periodType === "month") {
    dateStart = dateStart.subtract(1, "month");
    dateEnd = dateEnd.subtract(1, "month");
  } else {
    dateStart = dateStart.subtract(7, "day");
    dateEnd = dateEnd.subtract(7, "day");
  }
  return { dateStart, dateEnd };
};

const dateLabel = (
  dateStart: Dayjs,
  dateEnd: Dayjs,
  displayMode: "week" | "month"
): string => {
  if (displayMode === "month") {
    return dateStart.format("MMMM YYYY");
  } else {
    return (
      dateStart.format("DD/MM/YYYY") + " - " + dateEnd.format("DD/MM/YYYY")
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
};
