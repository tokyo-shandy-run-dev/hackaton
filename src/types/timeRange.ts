export class TimeRange {
  start: Date;
  end: Date;
  constructor(start: Date, end: Date) {
    if (start > end) throw new Error("start must be before end");
    this.start = start;
    this.end = end;
  }
}
