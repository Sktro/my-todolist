import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

// Create
// Read
// Update
// Delete
// CRUD
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all"|"active"|"completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}
function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: "all"},
        {id: todoListId_2, title:'What to buy', filter: "all"}
    ])

    const[tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],[todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bear", isDone: true},
            {id: v1(), title: "Fish", isDone: false},
        ]
    })
    //BLL:
    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl)
        setTodoLists(updatedTodoLists)
    }
    const removeTask = (taskID: string, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const addTask = (newTaskTitle: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        const copyState = {...tasks}
        copyState[todoListId] = [newTask, ...tasks[todoListId]]
        setTasks(copyState)
    }
    const changeTaskStatus = (taskID: string, newIsDone: boolean, todoListId: string) => {
        const copyState = {...tasks}
        copyState[todoListId] = tasks[todoListId].map(t => t.id === taskID ? {...t, isDone: newIsDone}: t)
        setTasks(copyState)
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
    }

    const getTaskForRender = (todoLists: TodoListType) => {
        switch (todoLists.filter){
            case 'active':
                return tasks[todoLists.id].filter(t=> !t.isDone)
            case 'completed':
                return tasks[todoLists.id].filter(t=> t.isDone)
            default:
                return tasks[todoLists.id]
        }
    }

    const todoListComponents = todoLists.map(tl => {
        const taskForRender = getTaskForRender(tl)
        return (
            <TodoList
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={taskForRender}
                filter={tl.filter}
                addTask={addTask}
                removeTodoList={removeTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
            />
        )
    })

    //UI:
    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;
