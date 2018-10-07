const tasks = [
  {
    id: 1,
    name: 'Задача 1',
    description: 'Моя задача №1',
    sheduledDate: '2018-01-01T00:00:00.000Z',
    finishDate: '2018-02-01T00:00:00.000Z',
    priorityId: 1,
  },
  {
    id: 2,
    name: 'Задача 2',
    description: 'Mоя задача №2',
    sheduledDate: '2018-02-01T00:00:00.000Z',
    finishDate: '2018-03-01T00:00:00.000Z',
    priorityId: 1,
  },
  {
    id: 3,
    name: 'Задача 3',
    description: 'Моя задача №3',
    sheduledDate: '2018-02-01T00:00:00.000Z',
    finishDate: '2018-04-01T00:00:00.000Z',
    priorityId: 2,
  },
  {
    id: 4,
    name: 'Задача 4',
    description: 'Моя задача №4',
    sheduledDate: '2018-01-01T00:00:00.000Z',
    finishDate: '2018-03-01T00:00:00.000Z',
    priorityId: 3,
  },
  {
    id: 5,
    name: 'Задача 5',
    description: 'Моя задача №5',
    sheduledDate: '2018-01-01T00:00:00.000Z',
    finishDate: '2018-01-01T00:00:00.000Z',
    priorityId: 1,
  },
];

const generateId = {
  [Symbol.iterator]() {
    let maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), tasks[0].id);
    maxId += 1;
    return {
      next() {
        return {
          value: maxId,
          done: false,
        };
      },
    };
  },
};

class TaskApi {
  static getAllTasks() {
    return new Promise(resolve => resolve(Object.assign([], tasks)));
  }

  static saveTask(task) {
    const intask = Object.assign({}, task);
    return new Promise((resolve) => {
      if (intask.id) {
        const existingTaskIndex = tasks.findIndex(a => a.id === intask.id);
        tasks.splice(existingTaskIndex, 1, intask);
      } else {
        const id = generateId[Symbol.iterator]();
        intask.id = id.next().value;
        tasks.push(task);
      }
      resolve(intask);
    });
  }

  static deleteTask(taskId) {
    return new Promise((resolve) => {
      const indexOfTaskToDelete = tasks.findIndex(task => task.id === taskId);
      tasks.splice(indexOfTaskToDelete, 1);
      resolve();
    });
  }
}

export default TaskApi;
