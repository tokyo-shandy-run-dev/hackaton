import { useMemo, useState } from "react";
import { TableContainer, Card, CardHeader, CardBody, Heading } from "@yamada-ui/react";
import { Table } from "@yamada-ui/table";

export function TimeStatsTable({ calendarValue, isDragging, setIsDragging }) {
  const [startRow, setStartRow] = useState('');
  const [startColumn, setStartColumn] = useState('');
  const [endRow, setEndRow] = useState('');
  const [endColumn, setEndColumn] = useState('');
  const [selectedCells, setSelectedCells] = useState(new Set()); 
  
  const generateDateSlots = (startDate: Date, endDate: Date) => {
    const dates = [];
    let currentDate = new Date(startDate.getTime());

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const generateTimeSlots = useMemo(() => {
    const timeSlots = [];
    for (let hour = 6; hour < 30; hour++) {
      const hourAdjusted = hour % 24;
      const timeSlot1 = `${hourAdjusted.toString().padStart(2, "0")}`;
      timeSlots.push(timeSlot1);
    }
    return timeSlots;
  }, []);

  const columns = useMemo(() => {
    const dates = calendarValue ? generateDateSlots(calendarValue[0], calendarValue[1]) : [];
    return [
      {
        header: "",
        accessorKey: "timeSlot",
        width: "16px",
      },
      ...generateTimeSlots.map(timeSlot => ({
        header: timeSlot,
        accessorKey: timeSlot,
      })),
    ];
  }, [calendarValue, generateTimeSlots]);

  const data = useMemo(() => {
    const dates = calendarValue ? generateDateSlots(calendarValue[0], calendarValue[1]) : [];
    return dates.map(date => {
      const rowData = { timeSlot: date.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" }) };
      generateTimeSlots.forEach(timeSlot => {
        rowData[timeSlot] = "";
      });
      return rowData;
    });
  }, [calendarValue, generateTimeSlots]);

  const handleMouseDown = (rowId: String, columnId: String) => {
    setIsDragging(true);
    setStartRow(rowId);
    setStartColumn(columnId);
    setSelectedCells(new Set([`${rowId}-${columnId}`]));
  }

  const handleMouseOver = (rowId: String, columnId: String) => {
    if (isDragging && columnId !== "timeSlot") {
      setSelectedCells((prevSelectedCells) => {
        const newSelectedCells = new Set(prevSelectedCells);
        newSelectedCells.add(`${rowId}-${columnId}`);
        console.log(selectedCells);
        return newSelectedCells;
      });
    }
  };

  const handleMouseUp = (rowId: String, columnId: String) => {
    setIsDragging(false);
    setEndRow(rowId);
    setEndColumn(columnId);
  };

  return (
    <Card variant="outline">
      <CardHeader>
        <Heading size="xl" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">あなたの予定</Heading>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table
            variant="striped"
            size="sm"
            columns={columns} 
            data={data}
            enableRowSelection={false}
            enableSorting={false}
            withColumnBorders
            cellProps={({ row, column }) => {
              return {
                onMouseDown: () => handleMouseDown(row.id, column.id),
                onMouseOver: () => handleMouseOver(row.id, column.id),
                onMouseUp: () => handleMouseUp(row.id, column.id),
                style: {
                  backgroundColor: selectedCells.has(`${row.id}-${column.id}`) ? "lightblue" : "inherit",
                },
              }
            }}
          />
        </TableContainer>
      </CardBody>
    </Card>
  );
}
