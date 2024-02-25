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
  Button,
  Input,
  FormControl,
} from "@yamada-ui/react";

export default function Page() {
  const [projectName, setProjectName] = useState('');
  const [calendarValue, setCalendarValue] = useState<Date[]>();
  const [totalTime, setTotalTime] = useState<number>();

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleTotalTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalTime(parseInt(e.target.value));
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
    <Card className="max-w-xl mx-auto mt-10 overflow-hidden">
      <CardHeader bgGradient="linear(to-l, #7928CA, #FF0080)" className="bg-blue-500 px-5 py-4">
        <Heading  className="text-white">新規プロジェクトの作成</Heading>
      </CardHeader>
      <CardBody className="p-6">
        <HStack>
          <VStack>
            <FormControl label="プロジェクト名を入力">
              <Input 
                className="shadow"
                type="text" 
                placeholder="project name" 
                value={projectName}
                onChange={handleProjectNameChange}
              />
            </FormControl>
            <FormControl label="集まりたい合計時間">
              <Input 
                className="shadow"
                type="number" 
                placeholder="total time"
                value={totalTime}
                onChange={handleTotalTimeChange}
              />
            </FormControl>
          </VStack>
          <VStack>
            <FormControl label="集まりたい日程">
              <Calendar
                  enableRange
                  value={calendarValue}
                  onChange={setCalendarValue}
              />
            </FormControl>
          </VStack>
        </HStack>
        <VStack>
          <Button 
            onClick={handleSubmit}
            colorScheme='primary'
          >決定</Button>
        </VStack>
      </CardBody>
    </Card>
  );
}
