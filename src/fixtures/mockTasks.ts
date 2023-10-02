import Task from '../services/createTask';

const task0 = new Task(0, 'Первая задача', '111', 'High', '');
const task1 = new Task(1, 'Вторая задача', '222', 'High', '');
const task2 = new Task(2, 'Третья задача', '333', 'Medium', '');
const task3 = new Task(3, 'Четвертая задача', '444', 'Medium', '');
const task4 = new Task(4, 'Пятая задача', '555', 'Low', '');
const task5 = new Task(5, 'Шестая задача', '666', 'Low', '');

task0.includeTask.push(new Task(6, 'Подзадача 1', 'подзадание', 'Low', ''));
task0.includeTask.push(new Task(7, 'Подзадача 2', 'подзадание', 'Low', ''));
task0.includeTask[0].includeTask.push(
  new Task(8, 'Подзадача 1-1', 'подзадание 1-1', 'Low', '')
);
task0.status = 'development';
task1.status = 'development';
task0.startDevDate =
  new Date().toDateString() + ' ' + new Date().toTimeString();
task1.startDevDate =
  new Date().toDateString() + ' ' + new Date().toTimeString();
task2.status = 'done';
task2.endDate = new Date().toDateString() + ' ' + new Date().toTimeString();
task3.includeComments.push({
  id: 1,
  creatingDate: new Date().toDateString() + ' ' + new Date().toTimeString(),
  text: 'Комментарий 1',
  includeComments: [
    {
      id: 1,
      creatingDate: new Date().toDateString() + ' ' + new Date().toTimeString(),
      text: 'Ответ 1',
      includeComments: [],
    },
    {
      id: 2,
      creatingDate: new Date().toDateString() + ' ' + new Date().toTimeString(),
      text: 'Ответ 2',
      includeComments: [],
    },
  ],
});
const mockTasks = [task0, task1, task2, task3, task4, task5];

export default mockTasks;
