import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface Todo {
  id: number;
  completed: boolean;
  title: string;
}

axios.get(url).then((response) => {
  const todo = response.data as Todo;

  const { id, completed, title } = todo;

  logTodo(id, title, completed);
});

const logTodo = (id: number, title: string, completed: boolean): void => {
  console.log(`
      The todo with id: ${id}
      Has a title of: ${title}
      Is it completed? ${completed}
    `);
};
