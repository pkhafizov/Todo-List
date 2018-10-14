const tasks = [
  {
    id: 1,
    name: 'Задача 1',
    description: 'Моя задача №1',
    sheduledDate: '2018-02-01T17:30:00',
    finishDate: '2018-02-02',
    priorityId: 1,
  },
  {
    id: 2,
    name: 'Задача 2',
    description: 'Mоя задача №2',
    sheduledDate: '2018-02-02',
    finishDate: '2018-02-21',
    priorityId: 2,
  },
  {
    id: 3,
    name: 'Задача 3',
    description: 'Моя задача №3',
    sheduledDate: '2018-02-03',
    finishDate: '2018-02-03',
    priorityId: 2,
  },
  {
    id: 4,
    name: 'Задача 4',
    description: 'Моя задача №4',
    sheduledDate: '2018-02-04',
    finishDate: '2018-02-02',
    priorityId: 3,
  },
  {
    id: 5,
    name: 'Задача 5',
    description: 'Моя задача №5',
    sheduledDate: '2018-02-05',
    finishDate: '2018-02-02',
    priorityId: 3,
  },
];

const priorities = [
  {
    id: 1,
    name: 'Обычная',
  },
  {
    id: 2,
    name: 'Важная',
  },
  {
    id: 3,
    name: 'Очень важная',
  },
];


const generateId = {
  [Symbol.iterator]() {
    let maxId = tasks.length > 0 ? tasks.reduce(
      (max, task) => (task.id > max ? task.id : max), tasks[0].id,
    ) : 0;
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

  static getAllPriorities() {
    return new Promise(resolve => resolve(Object.assign([], priorities)));
  }

  static getTasksByPriority(priorityId) {
    const id = priorityId;
    let tasksByPriority = [];
    return new Promise((resolve) => {
      if (id === -1) {
        tasksByPriority = Object.assign([], tasks);
      } else {
        tasksByPriority = tasks.filter(t => t.priorityId === id);
      }
      resolve(tasksByPriority);
    });
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
    const id = taskId;
    return new Promise((resolve) => {
      const indexOfTaskToDelete = tasks.findIndex(task => task.id === id);
      tasks.splice(indexOfTaskToDelete, 1);
      resolve(id);
    });
  }
}

export default TaskApi;
