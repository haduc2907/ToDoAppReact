import { useEffect, useState } from "react"
import { GetAll, Delete, UpdateStatus, Create, Update, Remove, GetImages, UploadImages, RemoveImages } from "./api"
import ListItem from "./components/ListItem"
import Form from "./components/TodoForm"
import style from "./style.module.css"


export default function App() {
    const [toDos, setToDos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [detail, setDetail] = useState()
    const [complted, setCompleted] = useState([])
    const [toast, setToast] = useState([])
    const [key, setKey] = useState("")
    const [toDoImages, setTodoImages] = useState([])

    const showToast = (message) => {
        const id = Date.now()
        setToast(t => [...t, { id, message }])
        setTimeout(() => {
            setToast(t => t.filter(item => item.id !== id))
        }, 10000)
    }

    useEffect(() => {
        setLoading(true)
        setError(null)
        GetAll("").then(res => setToDos(res.data.data ?? []))
            .catch(() => setError("Không tải được dữ liệu!"))
            .finally(() => setLoading(false))
    }, [])

    const handleFind = (key) => {
        setLoading(true)
        setError(null)
        GetAll(key).then(res => setToDos(res.data.data ?? []))
            .catch(() => setError("Không tải được dữ liệu!"))
            .finally(() => setLoading(false))
    }

    const handleChangeKey = (e) => {
        const key = e.target.value
        setKey(key)
    }

    const handleChecked = (id) => {
        setCompleted(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id)
            } else {
                return [...prev, id]
            }
        })
    }

    const handleDone = () => {
        if (complted.length === 0) return
        UpdateStatus(complted)
            .then((res) => {
                setToDos(prev => prev.map(item =>
                    complted.includes(item.id)
                        ? { ...item, isCompleted: true }
                        : item
                ))
                showToast(`${res.data.status}: ${res.data.message}`)
                setCompleted([])
            })
            .catch(() => setError("Error"))
    }

    const handleDetail = (id) => {
        if (detail != id) {
            setDetail(id)
            GetImages(id)
                .then(res => setTodoImages(res.data.data ?? []))
                .catch(() => setTodoImages([]))
            console.log(toDoImages)
        } else {
            setTodoImages([])
            setDetail(0)
        }
    }

    const handleDelete = (id) => {
        Delete(id)
            .then((res) => {
                setToDos(prev => prev.filter(todo => todo.id !== id))
                showToast(`${res.data.status}: ${res.data.message}`)
            })
            .catch(() => setError("Xóa thất bại!"))
    }

    const handleAdd = async (formData, files) => {
        try {
            const res = await Create(formData)
            setToDos(prev => [...prev, res.data.data])
            showToast(`${res.data.status}: ${res.data.message}`)

            if (files.length) {
                const addImg = await UploadImages(res.data.data.id, files)
                showToast(`${addImg.data.status}: ${addImg.data.message}`)
            }
        } catch {
            setError("Thêm thất bại!")
        }
    }

    const handleUpdate = async (formData, imgDelete, filesUpdate) => {
        try {
            console.log("imgDelete " + imgDelete)
            console.log("filesUpdate: " + filesUpdate)
            const res = await Update(formData.id, formData)
            setToDos(prev => prev.map(item =>
                item.id === formData.id ? res.data.data : item
            ))
            showToast(`${res.data.status}: ${res.data.message}`)
            if (imgDelete.length) {
                const imgRes = await RemoveImages(formData.id, imgDelete)
                showToast(`${imgRes.data.status}: ${imgRes.data.message}`)
            }
            if (filesUpdate.length) {
                const addImg = await UploadImages(formData.id, filesUpdate)
                showToast(`${addImg.data.status}: ${addImg.data.message}`)
            }
            const images = await GetImages(formData.id)
            setTodoImages(images.data.data ?? [])

        } catch {
            setError("Cập nhật thất bại!")
        }
    }

    const handleRemove = () => {
        if (complted.length === 0) return
        Remove(complted)
            .then((res) => {
                setToDos(prev => prev.filter(item => !complted.includes(item.id)))
                setCompleted([])
                showToast(`${res.data.status}: ${res.data.message}`)
            })
            .catch(() => setError("Xoá thất bại!"))
    }

    return (
        <div className={style.container}>
            <div className={style.toastWrapper}>
                {toast.map(item => (
                    <div key={item.id} className={style.toast}>
                        ✅ {item.message}
                        <span style={{ cursor: "pointer" }} onClick={() => setToast(t => t.filter(i => i.id !== item.id))}>×</span>
                    </div>
                ))}
            </div>
            <Form onAdd={handleAdd} onUpdate={handleUpdate} />
            <ListItem
                handleChangeKey={handleChangeKey}
                handleFind={handleFind}
                handleDone={handleDone}
                handleRemove={handleRemove}
                handleDetail={handleDetail}
                handleDelete={handleDelete}
                handleChecked={handleChecked}
                handleUpdate={handleUpdate}
                loading={loading}
                error={error}
                searchKey={key}
                toDos={toDos}
                detail={detail}
                complted={complted}
                toDoImages={toDoImages}
            />
        </div>
    )
}