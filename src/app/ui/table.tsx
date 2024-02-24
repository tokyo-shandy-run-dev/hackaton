import { useMemo, useState } from "react";
import {
  TableContainer,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Button,
  VStack,
  HStack,
  Text,
} from "@yamada-ui/react";
import { Table } from "@yamada-ui/table";

type TimeStatsTableProps = {
  calendarValue: Date[];
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TimeStatsTable({ calendarValue, isDragging, setIsDragging }: TimeStatsTableProps) {
  const [startRow, setStartRow] = useState<number>();
  const [startColumn, setStartColumn] = useState<number>();
  const [currentStatus, setCurrentStatus] = useState(2);
  const [cellStatuses, setCellStatuses] = useState<number[][]>([]);
  const [sched, setSched] = useState<number[][]>([]);

  const generateDateSlots = (startDate: Date | undefined, endDate: Date | undefined) => {
    if (startDate === undefined) return [];
    if (endDate === undefined) return [startDate];

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
    return [
      {
        header: "",
        accessorKey: "timeSlot",
        width: "16px",
      },
      ...generateTimeSlots.map((timeSlot) => ({
        header: () => <div className="select-none">{timeSlot}</div>,
        accessorKey: timeSlot,
      })),
    ];
  }, [generateTimeSlots]);

  type RowData = {
    timeSlot: string;
    [key: string]: string;
  };

  const data = useMemo(() => {
    const dates = generateDateSlots(calendarValue[0], calendarValue[1]);
    return dates.map((date) => {
      const rowData: RowData = {
        timeSlot: date.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" }),
      };
      generateTimeSlots.forEach((timeSlot) => {
        rowData[timeSlot] = "";
      });
      return rowData;
    });
  }, [calendarValue, generateTimeSlots]);

  useMemo(() => {
    setCellStatuses(data.map(() => Array(columns.length).fill(0)));
  }, [data, columns]);

  const handleMouseDown = (rowId: number, colId: number) => {
    if (colId === 99) return;
    setIsDragging(true);
    setStartRow(rowId);
    setStartColumn(colId);
    setSched(cellStatuses);
  };

  const handleMouseOver = (rowId: number, colId: number) => {
    if (!isDragging || colId === 99) return;

    const startRowId = startRow!;
    const startColId = startColumn!;

    const minRowIndex = Math.min(startRowId, rowId);
    const maxRowIndex = Math.max(startRowId, rowId);
    const minColId = Math.min(startColId, colId);
    const maxColId = Math.max(startColId, colId);

    setCellStatuses(() => {
      const newStatuses = sched.map((row) => [...row]);
      for (let i = minRowIndex; i <= maxRowIndex; i++) {
        for (let j = minColId; j <= maxColId; j++) {
          newStatuses[i][j] = currentStatus;
        }
      }
      return newStatuses;
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setSched(cellStatuses);
  };

  const handleClick = (rowId: number, colId: number) => {
    if (colId === 99) return;
    const newStatuses = sched.map((row) => [...row]);
    newStatuses[rowId][colId] = currentStatus;
    setCellStatuses(newStatuses);
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <Card className="max-w-4xl mx-auto mt-10 overflow-hidden">
      <CardHeader bgGradient="linear(to-l, #7928CA, #FF0080)" className="px-5 py-4">
        <Heading className="text-white">あなたの予定</Heading>
      </CardHeader>
      <CardBody className="p-6">
        <Text fontSize="xs">
          ご都合にあった利用マークを選択し、タイムラインをクリックまたはドラッグすると予定が入力できます。
        </Text>
        <HStack>
          <Button
            variant={currentStatus === 2 ? "solid" : "outline"}
            colorScheme="success"
            size="md"
            onClick={() => setCurrentStatus(2)}
          >
            可
          </Button>
          <Button
            variant={currentStatus === 1 ? "solid" : "outline"}
            colorScheme="warning"
            size="md"
            onClick={() => setCurrentStatus(1)}
          >
            未定
          </Button>
          <Button
            variant={currentStatus === 0 ? "solid" : "outline"}
            colorScheme="danger"
            size="md"
            onClick={() => setCurrentStatus(0)}
          >
            不可
          </Button>
        </HStack>
        <VStack>
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
                const rowId = parseInt(row.id);
                const colId = column.id === "timeSlot" ? 99 : parseInt(column.id);
                const status = cellStatuses[rowId][colId];
                let bgColor = "inherit";
                if (status === 2) bgColor = "#3cc360";
                else if (status === 1) bgColor = "#f97415";
                else if (status === 0) bgColor = "#ea4334";

                return {
                  onMouseDown: () => handleMouseDown(rowId, colId),
                  onMouseOver: () => handleMouseOver(rowId, colId),
                  onMouseUp: () => handleMouseUp(),
                  onClick: () => handleClick(rowId, colId),
                  className: "select-none",
                  style: {
                    backgroundColor: bgColor,
                  },
                };
              }}
            />
          </TableContainer>
          <Button onClick={handleSubmit} colorScheme="primary">
            決定
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
}
