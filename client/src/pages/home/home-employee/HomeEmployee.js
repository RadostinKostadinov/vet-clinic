// Libraries
import { useContext } from "react";

// App modules
import Month from "../../../features/calendar/components/MonthView/Month";
import Week from "../../../features/calendar/components/WeekView/Week";
import { CalendarContext } from "../../../context/features/CalendarContext";

export default function HomeEmployee() {
  const { isWeekView } = useContext(CalendarContext);

  return <>{isWeekView ? <Week /> : <Month />}</>;
}
