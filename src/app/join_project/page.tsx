'use client';

import { 
  UIProvider, 
  Button,
} from "@yamada-ui/react";
import { Calendar } from "@yamada-ui/calendar";
import { useState, useEffect } from "react";
import { TimeStatsTable } from "../ui/table";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [calendarValue, setCalendarValue] = useState();

  const handleSubmit = () => {
    console.log('submit');
  }

  return (
    <UIProvider >
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
      <Button onClick={handleSubmit}>決定</Button>
    </UIProvider>
  );
}
