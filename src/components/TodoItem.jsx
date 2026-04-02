import style from "../style.module.css"
import {Mid} from "./TodoForm"

export default function ToDoItem({ todo, onDelete, onDetail, detail, onChecked, checked, onUpdate, toDoImages }) {
    return (
        <div >
            
            <div className={style.item} style={{
                borderLeft: todo.isCompleted && "4px solid #8f9ede"
            }}>
                <div className={style.itemLeft}>
                    <input type="checkbox" checked={checked} onChange={() => onChecked(todo.id)} />
                    <div style={{
                        background: todo.piority === 2 ? "Green" : todo.piority === 1 ? "gray" : "Red",
                        borderRadius: "3px",
                        fontSize: "13px",
                        color: "white",
                        padding: "1px 10px"
                    }}>
                        <span>
                            {todo.piority === 2 ? "low" : todo.piority === 1 ? "normal" : "hight"}
                        </span>

                    </div>
                    <span>
                        {todo.title}
                    </span>
                    
                </div>
                <div className={style.itemRight}>
                    <span style={{ cursor: "pointer" }} onClick={() => onDelete(todo.id)}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path></svg></span>
                    <span style={{ cursor: "pointer" }} onClick={() => onDetail(todo.id)}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg>    </span>
                </div>
            </div>
            {detail && <Mid onUpdate={onUpdate} add={false} update={true} selectedTodo={todo} toDoImages={toDoImages}/>}
            
        </div>
    )
}