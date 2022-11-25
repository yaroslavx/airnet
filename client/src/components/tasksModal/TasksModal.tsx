import { Dispatch, FC, SetStateAction, useContext } from 'react'
import { CustomTasksModal } from './TasksModal.styles'
import { ProfileContext } from '../calendar/Calendar'
import { TaskType } from '../rightSide/RightSide'

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': 'http://localhost:8080',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, PUT, PATCH, GET, DELETE, OPTIONS"
}

type ModalProps = {
    tasks: TaskType[] | undefined,
    setTasks: Dispatch<SetStateAction<TaskType[] | undefined>>
    taskDate?: string
    close: () => void
}

const TasksModal: FC<ModalProps> = ({ tasks, setTasks, taskDate, close }) => {
    const { profileId } = useContext(ProfileContext)
    const removeTask = async (taskId: number) => {
        await fetch('http://localhost:5000/api/tasks',
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "taskId": taskId,
                })
            }
        )
        const responce = await fetch(`http://localhost:5000/api/tasks/${profileId}`)
        const profileTasksFromApi = await responce.json()
        setTasks(profileTasksFromApi)
    }

    return (
        <CustomTasksModal onClick={close}>
            <div className='modal' onClick={e => e.stopPropagation()}>
                <div className='tasks'>
                    {tasks ? tasks.filter(task => task.task_date === taskDate).map(task => <div className='task_container'><div className='task'>{task.task}</div><button className='delete' onClick={() => removeTask(task.taskId)}>–</button></div>) : ''}
                </div>
            </div>
        </CustomTasksModal>
    )
}

export default TasksModal