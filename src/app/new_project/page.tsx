'use client';
import { useState } from "react";
import { Calendar } from "@yamada-ui/calendar";
import { 
  VStack,
  HStack,
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
      <Card className="max-w-xl mx-auto mt-10 overflow-hidden">
        <CardHeader bgGradient="linear(to-l, #7928CA, #FF0080)" className="bg-blue-500 px-5 py-4">
          <Heading  className="text-white">新規プロジェクトの作成</Heading>
        </CardHeader>
        <CardBody className="p-6">
          <HStack>
            <VStack>
              <Heading size="md">プロジェクト名を入力</Heading>
              <Input 
                className="shadow"
                type="text" 
                placeholder="project name" 
                value={projectName}
                onChange={handleProjectNameChange}
              />
              <Heading size="md">集まりたい合計時間を入力</Heading>
              <Input 
                className="shadow"
                type="number" 
                placeholder="total time"
                value={totalTime}
                onChange={handleTotalTimeChange}
              />
            </VStack>
            <VStack>
              <Heading size="md">プロジェクトの日程を選択</Heading>
              <Calendar
                  enableRange
                  value={calendarValue}
                  onChange={setCalendarValue}
              />
            </VStack>
          </HStack>
          <VStack>
            <Button 
              onClick={handleSubmit}
              colorScheme='primary'
            >次へ</Button>
          </VStack>
        </CardBody>
      </Card>
    </UIProvider>
  );
}
