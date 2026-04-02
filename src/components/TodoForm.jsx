import { useState, useEffect, useRef } from "react"
import style from "../style.module.css"

function Head() {
    return <div style={{ fontSize: "20px", textAlign: "center", color: "rgb(74, 74, 74)" }}>NEW TASK</div>
}

export function Mid({ onAdd, onUpdate, add, update, selectedTodo, toDoImages }) {
    const today = new Date().toISOString().split("T")[0];

    const [form, setForm] = useState({
        title: "",
        description: "",
        dueDate: "",
        piority: 1
    })

    const [previews, setPreviews] = useState([])
    const [files, setFiles] = useState([])
    const [previewUpdate, setPreviewsUpdate] = useState([])
    const [filesUpdate, setFilesUpdate] = useState([])
    const [imgDelete, setImgDelete] = useState([])
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (selectedTodo) {
            setForm({
                id: selectedTodo.id,
                title: selectedTodo.title,
                description: selectedTodo.description,
                dueDate: selectedTodo.dueDate?.split("T")[0],
                piority: Number(selectedTodo.piority)
            })
        }
    }, [selectedTodo])

    function handleImageChange(e) {
        const selectedFiles = Array.from(e.target.files)
        if (selectedFiles.length === 0) return
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file))

        if (add) {
            setPreviews(prev => [...prev, ...newPreviews])
            setFiles(prev => [...prev, ...selectedFiles])
        } else {
            setPreviewsUpdate(prev => [...prev, ...newPreviews])
            setFilesUpdate(prev => [...prev, ...selectedFiles])
        }
        e.target.value = ""
    }

    function handleRemoveImage(index) {
        if (add) {
            URL.revokeObjectURL(previews[index])
            setPreviews(prev => prev.filter((_, i) => i !== index))
            setFiles(prev => prev.filter((_, i) => i !== index))
        } else {
            setImgDelete(id => [...id, index])
            setPreviewsUpdate(prev => prev.filter((_, i) => i !== index))
            setFilesUpdate(prev => prev.filter((_, i) => i !== index))
        }
    }

    function handleChange(e) {
        const value = e.target.name === "piority" ? Number(e.target.value) : e.target.value
        setForm({ ...form, [e.target.name]: value })
    }

    function handleAdd(e) {
        e.preventDefault()
        onAdd(form, files)
        setForm({ title: "", description: "", dueDate: "", piority: 1 })
        setPreviews([])
        setFiles([])
    }

    async function handleUpdate(e) {
        e.preventDefault()
        await onUpdate(form, imgDelete, filesUpdate)
        setPreviewsUpdate([])
        setFilesUpdate([])
        setImgDelete([])
    }

    return (
        <form className={style.form}>
            <label>Title:<sup style={{ color: "red", fontSize: "10px" }}>*</sup>
                {!form.title && <span style={{ color: "red", fontSize: "10px" }}>Required</span>}
            </label>
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" required
                style={!form.title ? { border: "solid 1px red" } : {}} />

            <label>Description:<sup style={{ color: "red", fontSize: "10px" }}>*</sup>
                {!form.description && <span style={{ color: "red", fontSize: "10px" }}>Required</span>}</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required
                style={!form.description ? { border: "solid 1px red" } : {}} />

            <div className={style.dp}>
                <div className={style.dueDate}>
                    <label>Due Date:<sup style={{ color: "red", fontSize: "10px" }}>*</sup>
                        {!form.dueDate && <span style={{ color: "red", fontSize: "10px" }}>Required</span>}</label>
                    <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} min={today} required
                        style={!form.dueDate ? { border: "solid 1px red" } : {}} />
                </div>

                <div className={style.piority}>
                    <label >Priority: </label>
                    <div className={style.select}>
                        <select name="piority" value={form.piority} onChange={handleChange}>
                            <option value={1}>Normal</option>
                            <option value={2}>Low</option>
                            <option value={3}>High</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={style.addImage}>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                />
                {add ? previews.map((src, index) => (
                    <div key={index} style={{ position: "relative" }}>
                        <img
                            src={src}
                            alt={`preview-${index}`}
                            style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "6px",
                                border: "1px solid #ddd",
                                display: "block"
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            style={{
                                position: "absolute",
                                top: "-6px",
                                right: "-6px",
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                background: "red",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "10px",
                                lineHeight: "18px",
                                textAlign: "center",
                                padding: 0
                            }}
                        >
                            ✕
                        </button>
                    </div>
                ))
                    : (
                        <>
                            {toDoImages
                                .filter(image => !imgDelete.includes(image.id))
                                .map(image => (
                                    <div key={image.id} style={{ position: "relative" }}>
                                        <img
                                            src={`https://localhost:7083${image.imageUrl}`}
                                            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ddd", display: "block" }}
                                        />
                                        <button type="button" onClick={() => handleRemoveImage(image.id)}
                                            style={{ position: "absolute", top: "-6px", right: "-6px", width: "18px", height: "18px", borderRadius: "50%", background: "red", color: "white", border: "none", cursor: "pointer", fontSize: "10px", lineHeight: "18px", textAlign: "center", padding: 0 }}>
                                            ✕
                                        </button>
                                    </div>
                                ))
                            }

                            {previewUpdate.map((src, index) => (
                                <div key={`new-${index}`} style={{ position: "relative" }}>
                                    <img
                                        src={src}
                                        style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ddd", display: "block" }}
                                    />
                                    <button type="button" onClick={() => handleRemoveImage(index)}
                                        style={{ position: "absolute", top: "-6px", right: "-6px", width: "18px", height: "18px", borderRadius: "50%", background: "red", color: "white", border: "none", cursor: "pointer", fontSize: "10px", lineHeight: "18px", textAlign: "center", padding: 0 }}>
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </>
                    )
                }
                <button className={style.buttonAddImage} type="button" onClick={() => fileInputRef.current.click()} >
                    +
                </button>
            </div>


            {add && <button type="button" onClick={handleAdd}>ADD</button>}
            {update && <button type="button" onClick={handleUpdate}>Update</button>}
        </form>
    )
}

export default function Form({ onAdd, onUpdate }) {
    return (
        <div className={style.left}>
            <Head />
            <Mid onAdd={onAdd} onUpdate={onUpdate} add={true} update={false} />
        </div>
    )
}