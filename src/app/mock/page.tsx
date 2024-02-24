"use client";
import { useMemo, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { RxCircle } from "react-icons/rx";
import {
  Icon,
  Input,
  VStack,
  Box,
  FormControl,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Button,
  Link,
  Flex,
  Spacer,
  NumberInput,
  Text,
} from "@yamada-ui/react";
import { register } from "module";
import { Column, Table } from "@yamada-ui/table";
import { Calendar } from "@yamada-ui/calendar";

const data: { label: string; data: ("ok" | "ng")[] }[] = [
  {
    label: "ueyama",
    data: [
      "ng",
      "ng",
      "ng",
      "ok",
      "ok",
      "ok",
      "ng",
      "ng",
      "ng",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ng",
      "ok",
      "ok",
      "ok",
      "ng",
      "ng",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ng",
      "ng",
      "ng",
    ],
  },
  {
    label: "tayu",
    data: [
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ng",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
    ],
  },
  {
    label: "ichou",
    data: [
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ng",
      "ok",
      "ok",
      "ok",
      "ok",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
    ],
  },
  {
    label: "yuta",
    data: [
      "ng",
      "ng",
      "ng",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ng",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
      "ok",
    ],
  },
];

const cards: { date: Date; start: Date; end: Date }[] = [
  {
    date: new Date("2024-2-24"),
    start: new Date("2024-2-24 10:30"),
    end: new Date("2024-2-24 11:30"),
  },
  {
    date: new Date("2024-2-25"),
    start: new Date("2024-2-24 10:30"),
    end: new Date("2024-2-24 11:30"),
  },
  {
    date: new Date("2024-2-26"),
    start: new Date("2024-2-24 10:30"),
    end: new Date("2024-2-24 11:30"),
  },
  {
    date: new Date("2024-2-27"),
    start: new Date("2024-2-24 10:30"),
    end: new Date("2024-2-24 11:30"),
  },
  {
    date: new Date("2024-2-28"),
    start: new Date("2024-2-24 10:30"),
    end: new Date("2024-2-24 11:30"),
  },
  {
    date: new Date("2024-2-29"),
    start: new Date("2024-2-24 10:30"),
    end: new Date("2024-2-24 11:30"),
  },
  {
    date: new Date("2024-3-1"),
    start: new Date("2024-2-24 10:30"),
    end: new Date("2024-2-24 11:30"),
  },
  {
    date: new Date("2024-3-2"),
    start: new Date("2024-2-24 9:30"),
    end: new Date("2024-2-24 11:30"),
  },
  {
    date: new Date("2024-3-3"),
    start: new Date("2024-2-24 10:30"),
    end: new Date("2024-2-24 11:30"),
  },
  {
    date: new Date("2024-3-4"),
    start: new Date("2024-2-24 15:30"),
    end: new Date("2024-2-24 19:30"),
  },
  {
    date: new Date("2024-3-5"),
    start: new Date("2024-2-24 12:30"),
    end: new Date("2024-2-24 13:30"),
  },
  {
    date: new Date("2024-3-6"),
    start: new Date("2024-2-24 10:30"),
    end: new Date("2024-2-24 11:30"),
  },
];

export default function Page() {
  return (
    <Flex w="full" p={8} paddingX={16} direction={"column"} gap={6}>
      <Flex direction={"row"} w="full">
        <Heading as="h1" size="4xl" isTruncated w="3000">
          Project Sched
        </Heading>
        <Spacer />
        <FormControl label="集合に使いたい合計時間">
          <NumberInput placeholder="basic" />
        </FormControl>
      </Flex>
      <Flex w="full" direction={"column"}>
        <Heading as="h1" size="2xl" isTruncated w="3000">
          Schedule Input
        </Heading>
        <Flex w="full" gap={10}>
          <Calendar enableRange />
          <table>
            <tbody>
              {data.map((d, i) => {
                return (
                  <tr key={i}>
                    <th scope="row" style={{ width: "100px" }}>
                      {d.label}
                    </th>
                    {d.data.map((d, j) => {
                      if (d == "ok")
                        return (
                          <td key={j} style={{ color: "green", width: "30px" }}>
                            <Icon as={RxCircle} size="xl" />
                          </td>
                        );
                      else
                        return (
                          <td key={j} style={{ color: "red" }}>
                            <Icon as={RxCross2} size="xl" />
                          </td>
                        );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Flex>
      </Flex>
      <Flex direction={"column"}>
        <Heading as="h1" size="2xl" isTruncated w="3000">
          Schedule Recommendation
        </Heading>
        <Flex gap={6} wrap={"wrap"}>
          {cards.map((c, i) => {
            return (
              <Card key={i} size="lg" w={"xl"}>
                <CardHeader paddingTop={5}>
                  <Heading as="h1" size="xl" isTruncated>
                    {c.date.getMonth() + 1}月{c.date.getDate()}日
                  </Heading>
                </CardHeader>
                <CardBody paddingTop={1} paddingBottom={5} paddingRight={10}>
                  <Text fontSize="4xl" padding="4px 10px">
                    {c.start.getHours()}:{c.start.getMinutes()} ~ {c.end.getHours()}:
                    {c.end.getMinutes()}
                  </Text>
                </CardBody>
              </Card>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}
