import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

const getRequest = (url) => {
  const fullUrl = baseUrl + url;
  return fullUrl;
};

const postRequest = (url, body) => {
  const fullUrl = baseUrl + url;
  const request = new Request(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return request;
};

const putRequest = (url, body) => {
  const fullUrl = baseUrl + url;
  const request = new Request(fullUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return request;
};

const delRequest = (url) => {
  const fullUrl = baseUrl + url;
  const request = new Request(fullUrl, {
    method: 'DELETE',
  });

  return request;
};

class TaskApi {
  static getAllTasks() {
    const gtrequest = getRequest('tasks');
    return new Promise((resolve, reject) => {
      fetch(gtrequest)
        .then(resp => resp.json())
        .then((data) => {
          resolve(Object.assign([], data));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static getAllPriorities() {
    const request = getRequest('priorities');
    return new Promise((resolve, reject) => {
      fetch(request)
        .then(resp => resp.json())
        .then((data) => {
          resolve(Object.assign([], data));
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static getTasksByPriority(priorityId) {
    const request = getRequest('tasks');
    return new Promise((resolve, reject) => {
      fetch(request)
        .then(resp => resp.json())
        .then((data) => {
          const id = priorityId;
          let tasksByPriority = [];
          if (id === -1) {
            tasksByPriority = Object.assign([], data);
          } else {
            tasksByPriority = data.filter(t => t.priorityId === id);
          }
          resolve(tasksByPriority);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static saveTask(task) {
    const intask = Object.assign({}, task);
    return new Promise((resolve, reject) => {
      if (intask.id) {
        const ptRequest = putRequest(`tasks/${intask.id}`, intask);
        fetch(ptRequest)
          .then(() => {
            resolve(intask);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        const pstRequest = postRequest('tasks', intask);
        fetch(pstRequest)
          .then(resp => resp.json())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }

  static deleteTask(taskId) {
    const id = taskId;
    return new Promise((resolve, reject) => {
      const dltRequest = delRequest(`tasks/${id}`);
      fetch(dltRequest)
        .then(() => {
          resolve(id);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default TaskApi;
