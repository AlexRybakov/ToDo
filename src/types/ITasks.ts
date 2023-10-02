export interface IComment {
  id: number;
  text: string;
  creatingDate: string;
  includeComments: IComment[];
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  createDate: string;
  startDevDate: string | null;
  devDuration: string | null;
  endDate: string | undefined;
  priority: string;
  includeFiles: File[];
  status: string;
  includeTask: ITask[];
  includeComments: IComment[];
}
