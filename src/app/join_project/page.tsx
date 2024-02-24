'use client';

import { Calendar } from "@yamada-ui/calendar";
import { useState } from "react";
import { TimeStatsTable } from "../ui/table";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [calendarValue, setCalendarValue] = useState();

  return (
    <div>
      <Calendar
        enableRange
        value={calendarValue}
        onChange={setCalendarValue}
      />
      <TimeStatsTable
        calendarValue={calendarValue}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
      />
    </div>
  );
}
