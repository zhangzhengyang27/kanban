import React, { useState } from "react"
import logo from "./logo.svg"
import "./App.css"

const KanbanBoard = ({ children }) => <main className="kanban-board">{children}</main>

const KanbanColumn = ({ children, className, title }) => {
  const combinedClassName = `kanban-column ${className}`
  return (
    <section className={combinedClassName}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  )
}

const KanbanCard = ({ title, status }) => {
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
    </li>
  )
}

const KanbanNewCard = ({ onSubmit }) => {
  const [title, setTitle] = useState("")
  const handlerChange = (event) => {
    setTitle(event.target.value)
  }
  const handlerKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit(title)
      setTitle("")
    }
  }
  return (
    <li className="kanban-card">
      <h3>新建任务</h3>
      <div className="card-title">
        <input type="text" value={title} onChange={handlerChange} onKeyDown={handlerKeyDown} />
      </div>
    </li>
  )
}

function App() {
  const [showAdd, setShowAdd] = useState(false)
  const [todoList, setTodoList] = useState([
    { title: "开发任务-1", status: "22-05-22 18:15" },
    { title: "开发任务-3", status: "22-05-22 18:15" },
    { title: "开发任务-5", status: "22-05-22 18:15" },
    { title: "测试任务-3", status: "22-05-22 18:15" }
  ])
  const [ongoingList, setOngoingList] = useState([
    { title: "开发任务-4", status: "2022-05-22 18:15" },
    { title: "开发任务-6", status: "2022-06-22 18:15" },
    { title: "测试任务-2", status: "2022-07-22 18:15" }
  ])
  const [doneList, setDoneList] = useState([
    { title: "开发任务-2", status: "2022-06-24 18:15" },
    { title: "测试任务-1", status: "2022-07-03 18:15" }
  ])

  const handlerAdd = () => {
    setShowAdd(true)
  }

  const handlerSubmit = (title) => {
    setTodoList((currentTodoList) => [
      { title, status: new Date().toDateString() },
      ...currentTodoList
    ])
    setShowAdd(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>我的看板</h1>
      </header>
      <KanbanBoard>
        <KanbanColumn
          className="column-todo"
          title={
            <>
              待办事项
              <button onClick={handlerAdd} disabled={showAdd}>
                + 添加新卡片
              </button>
            </>
          }>
          {showAdd && <KanbanNewCard onSubmit={handlerSubmit} />}
          {todoList.map((props) => (
            <KanbanCard {...props} />
          ))}
        </KanbanColumn>
        <KanbanColumn className="column-ongoing" title="进行中">
          {ongoingList.map((props) => (
            <KanbanCard {...props} />
          ))}
        </KanbanColumn>
        <KanbanColumn className="column-done" title="已完成">
          {doneList.map((props) => (
            <KanbanCard {...props} />
          ))}
        </KanbanColumn>
      </KanbanBoard>
    </div>
  )
}

export default App
