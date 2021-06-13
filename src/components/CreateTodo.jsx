import React, {useState} from 'react'
import TodoList from './TodoList'
import swal from 'sweetalert'

function CreateTodo() {
    const [todo, setTodo] = useState({title:"", done:false})
    const [todoArr, setTodoArr] = useState([])

    let todos=localStorage.hasOwnProperty("todos") ? JSON.parse(localStorage.getItem("todos")) : []

    const onChange = (event) => {
        let {value} = event.target
        let obj = {}
        obj["title"] = value
        obj["done"] = false
        setTodo(obj)


    }

    const CreateTodo = (event) => {
        const {name} = event.target
        if(event.key === "Enter" || name === "addtodo"){
            if(todo.title !== ""){
                todos.unshift(todo)
                localStorage.setItem('todos', JSON.stringify(todos))
                setTodo({title:"", done:false})

            }else{
                swal("Oops, Please write first")


            }
        }
    }

    const completeTodo = (i) => {
        if(todos[i]["done"] !== true) {
            todos[i]["done"] = true
            localStorage.setItem("todos", JSON.stringify(todos))
            setTodoArr(todos)
            swal("Good Job!, completed todo, Success!!")
            }

        }
    const deleteTodo= (i) =>{
        swal({
            title: "are you sure?",
            text: "once deleted you wont be able to view this again",
            icon: "warning",
            buttons: true, 
            dangerMode:true 
        }).then(res=>{
            if(res){
                todos.splice(i,1)
                localStorage.setItem('todos', JSON.stringify(todos))
                setTodoArr(todos)    
            }
        })

    }
    

    return (
    <>
        <div className="box">
            <div classname = "text-end">
                <h3> React Todo App</h3>
                <h4> Add a reminder</h4>
            </div>
            <div className="text-addTodo">
                <input type= "Text" name="todo" placeholder = "Write here.." value= {todo.title} onKeyPress={CreateTodo} onChange= {onChange}/>
                <button classname= "btn-addTodo" type= "button" name="addTodo" onClick={CreateTodo}>Add Todo</button>

            </div>
            
        </div>
        <TodoList todoArr= {todoArr}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}/>
    </>
    );
}

export default CreateTodo
