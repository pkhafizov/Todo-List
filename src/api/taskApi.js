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
    return fetch(gtrequest)
      .then(resp => resp.json())
      .then(data => Object.assign([], data))
      .catch((error) => { throw error; });
  }

  static getAllPriorities() {
    const request = getRequest('priorities');
    return fetch(request)
      .then(resp => resp.json())
      .then(data => Object.assign([], data))
      .catch((error) => { throw error; });
  }

  static getTasksByPriority(priorityId) {
    const request = getRequest('tasks');
    return fetch(request)
      .then(resp => resp.json())
      .then((data) => {
        const id = priorityId;
        let tasksByPriority = [];
        if (id === -1) {
          tasksByPriority = Object.assign([], data);
        } else {
          tasksByPriority = data.filter(t => t.priorityId === id);
        }
        return tasksByPriority;
      })
      .catch((error) => { throw error; });
  }

  static saveTask(task) {
    const intask = Object.assign({}, task);
    let pstRequest;
    if (intask.id) {
      pstRequest = putRequest(`tasks/${intask.id}`, intask);
    } else {
      pstRequest = postRequest('tasks', intask);
    }
    return fetch(pstRequest)
      .then(resp => resp.json())
      .then(data => data)
      .catch((error) => { throw error; });
  }

  static deleteTask(taskId) {
    const id = taskId;
    const dltRequest = delRequest(`tasks/${id}`);
    return fetch(dltRequest)
      .then(() => id)
      .catch((error) => { throw error; });
  }
}

export default TaskApi;
