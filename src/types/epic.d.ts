export interface Epic {
  id: number;
  name: string;
  projectId: number;
  kanbanId: number;
  // 开始时间
  start: number;
  // 结束时间
  end: number;
}
