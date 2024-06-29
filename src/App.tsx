import { FormEvent, useState } from "react";
import { Rocket, PlusCircle, ClipboardText } from "phosphor-react";
import styles from "./App.module.css";
import "./global.css";
import { Todo } from "./components/Todo";

interface TodoProps{
  title: string;
  done: boolean;
}

export function App() {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  // -- Adicionar todo --

  function handleAddNewTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(!newTodoTitle){
      return;
    }

    const newTodo = {
      title: newTodoTitle,
      done: false
    }

    setTodos([...todos, newTodo]);

    console.log(todos);
    setNewTodoTitle("");
  }

  function handleNewTodoTitle(e: React.ChangeEvent<any>) {
    setNewTodoTitle(e.target.value);
  }

  // -- Excluir todo --

  function deleteTodo(title: string) {
    const todoToBeDeleted = todos.find(todo => todo.title === title);

    const todosWithoutDeletedOne = todos.filter(todo => todo !== todoToBeDeleted);

    setTodos(todosWithoutDeletedOne);
  }

  // -- Marcar como feito/não feito --

  function handleToggleTodoDone({ title, isChecked}: { title: string; isChecked: boolean}){
    const updatedTodos = todos.map((todo) => {
      if(todo.title === title) {
        return {...todo, done: isChecked}
      }

      return { ...todo }
    })

    setTodos(updatedTodos);
  }

  const todosDone = todos.filter(todo => todo.done === true);


  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <Rocket size={32} />
          <div>
            <span>to</span><span>do</span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <form onSubmit={handleAddNewTodo}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTodoTitle}
            onChange={handleNewTodoTitle}
          />
          <button type="submit">
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.content}>
          <div className={styles.todoInfo}>
            <div className={styles.todoCreated}>
              <p>Tarefas criadas </p>
              <span className={styles.todoLength}>{todos.length}</span>
            </div>
            <div className={styles.todoDone}>
              <p>Tarefas concluídas </p>
              <span className={styles.todoLength}>{todosDone.length} de {todos.length}</span>
            </div>
          </div>
        </div>

        {
          todos.length === 0 ?
            <div className={styles.todoListEmpty}>
              <ClipboardText size={56} />
              <p>Você ainda não tem tarefas criadas</p>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
            :
            <div className={styles.todoList}>
              {todos.map(todo => {
                return (
                  <Todo
                    todo={todo}
                    deleteTodo={deleteTodo}
                    toggleTodoDone={handleToggleTodoDone}
                  />
                )
              })}
            </div>
        }
      </div>
    </div>
  );
}
