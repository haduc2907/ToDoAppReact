import ToDoItem from "./TodoItem"
import style from "../style.module.css"

export default function List({handleChangeKey, handleFind, handleDone, handleRemove, handleDetail, handleDelete
    , handleChecked, handleUpdate, loading, error, searchKey, toDos, detail, complted, toDoImages
}) {
    return (
        
        <div className={style.right}>
            <div className={style.headerRight}>
                <span className={style.rightTitle}>Todo list</span>
                <span className={style.rightFind}>
                    <input type="text" placeholder="key" onChange={handleChangeKey} value={searchKey} onKeyDown={(e) => e.key === "Enter" && handleFind(searchKey)} />
                    <span onClick={() => handleFind(searchKey)}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg></span>
                </span>
            </div>
            <div className={style.listItem}>
                {loading && <p>Đang tải...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {toDos.map(todo => (
                    <ToDoItem
                        key={todo.id}
                        todo={todo}
                        onDetail={handleDetail}
                        onDelete={handleDelete}
                        detail={detail === todo.id}
                        onChecked={handleChecked}
                        checked={complted.includes(todo.id) ? true : false}
                        onUpdate={handleUpdate}
                        toDoImages = {toDoImages}
                    />
                ))}
            </div>
            <div className={style.blukAction}>
                <div style={{ color: "rgb(74, 74, 74)", fontSize: "20px" }}>Bluk Action</div>
                <div className={style.action}>
                    <button className={style.done} onClick={handleDone}>Done</button>
                    <button className={style.remove} onClick={handleRemove}>Remove</button>
                </div>
            </div>

        </div>
    )
}