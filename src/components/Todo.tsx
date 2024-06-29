import { useState } from "react";
import { Trash, CheckCircle, Circle } from "phosphor-react";
import styles from "./Todo.module.css";

interface ToDo{
    title: string;
    done?: boolean;
}

interface TodoProps{
    todo: ToDo;
    deleteTodo: (title: string) => void;
    toggleTodoDone: ({title, isChecked}: {title: string; isChecked: boolean }) => void;
}

export function Todo({ todo, deleteTodo, toggleTodoDone }: TodoProps) {
    const [isChecked, setIsChecked] = useState(todo.done);

    function handleToggleTodoDone() {
        toggleTodoDone({title: todo.title, isChecked: !todo.done});
        setIsChecked(!isChecked);
    }

    return (
        <div className={styles.todo}>
            <div>
                <button
                    onClick={() =>handleToggleTodoDone()}
                    className={styles.buttonChecked}
                >
                    {
                        isChecked ?
                            <CheckCircle className={styles.checked} /> :
                            <Circle className={styles.notChecked} />
                    }

                </button>
                {
                    isChecked ?
                        <p className={styles.checkedText}>
                            {todo.title}
                        </p>
                        :
                        <p>
                            {todo.title}
                        </p>
                }
            </div>
            <button 
            onClick={() => deleteTodo(todo.title)}
            className={styles.trashButton}
            >
                <Trash size={24} />
            </button>
        </div>
    )
}