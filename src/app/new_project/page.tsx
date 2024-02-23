'use client';
import { useState } from "react";
import { Calendar } from "@yamada-ui/calendar";
import { 
  VStack,
  Card,
  CardHeader,
  CardBody,
  Heading,
  UIProvider,
  Button,
  Input,
} from "@yamada-ui/react";

export default function Page() {
  const [projectName, setProjectName] = useState('');
  const [calendarValue, setCalendarValue] = useState();
  const [totalTime, setTotalTime] = useState();

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleTotalTimeChange = (e) => {
    setTotalTime(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      projectName,
      calendarValue,
      totalTime
    }
    console.log(data);
  };

  return (
    <UIProvider>
      <Card>
        <CardHeader>
          <Heading size="xl">新規プロジェクトの作成</Heading>
        </CardHeader>
        <CardBody>
          <Heading size="md">プロジェクト名を入力</Heading>
          <Input 
            type="text" 
            placeholder="project name" 
            value={projectName}
            onChange={handleProjectNameChange}
          />
          <Heading size="md">プロジェクトの日程を選択</Heading>
          <Calendar
              enableRange
              value={calendarValue}
              onChange={setCalendarValue}
          />
          <Heading size="md">集まりたい合計時間を入力</Heading>
          <Input 
            type="number" 
            placeholder="total time"
            value={totalTime}
            onChange={handleTotalTimeChange}
          />
          <VStack>
            <Button onClick={handleSubmit}>次へ</Button>
          </VStack>
        </CardBody>
      </Card>
    </UIProvider>
  );
}
