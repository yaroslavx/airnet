import { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { CustomAddTaskModal } from './AddTaskModal.styles'
import { IoAddCircle } from 'react-icons/io5'
import { GoFileDirectory } from 'react-icons/go'
import { ProfileContext } from '../calendar/Calendar'
import { TaskType } from '../rightSide/RightSide'


type ModalProps = {
    taskDate?: string
    setTasks: Dispatch<SetStateAction<TaskType[] | undefined>>
    close: () => void
}

const AddTaskModal: FC<ModalProps> = ({ taskDate, setTasks, close }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [task, setTask] = useState<string>()

    useEffect(() => {
        textareaRef.current?.focus()
    }, [])

    const { profileId } = useContext(ProfileContext)

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:8080',
    }

    const addTask = async () => {
        await fetch('http://localhost:5000/api/tasks',
            {
                mode: 'no-cors',
                credentials: 'include',
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    "task": task,
                    "task_date": taskDate,
                    "profileId": profileId
                })

            }
        )
        const responce = await fetch(`http://localhost:5000/api/tasks/${profileId}`)
        const profileTasksFromApi = await responce.json()
        setTasks(profileTasksFromApi)
        close()
    }

    return (
        <CustomAddTaskModal onClick={close}>
            <div className='modal' onClick={e => e.stopPropagation()}>
                <textarea value={task} onChange={e => setTask(e.target.value)} className='textarea' ref={textareaRef} />
                <div className='buttons'>
                    <button onClick={addTask} className='add_task'><IoAddCircle />Add task</button>
                    <button className='upload_file'><GoFileDirectory />Upload file</button>
                </div>
            </div>
        </CustomAddTaskModal>
    )
}

export default AddTaskModal