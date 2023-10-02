import { IComment, ITask } from '../types/ITasks';

class Task {
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

  constructor(
    id: number,
    title: string,
    description: string,
    priority: string,
    endDate: string,
    includeFiles = [] as File[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createDate =
      new Date().toDateString() + ' ' + new Date().toTimeString();
    this.startDevDate = null;
    this.devDuration = null;
    this.endDate = endDate;
    this.priority = priority;
    this.includeFiles = includeFiles;
    this.status = 'queue';
    this.includeTask = [];
    this.includeComments = [];
  }
}

export default Task;
