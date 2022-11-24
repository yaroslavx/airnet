import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { CustomAddTaskModal } from './AddTaskModal.styles'
import { IoAddCircle } from 'react-icons/io5'
import { BsFileEarmarkFill } from 'react-icons/bs'

import { MdOutlineAttachFile } from 'react-icons/md'
import { GoFileDirectory } from 'react-icons/go'
import { ProfileContext } from '../calendar/Calendar'
import axios from 'axios'


type ModalProps = {
    close: () => void
}

const AddTaskModal: FC<ModalProps> = ({ close }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [task, setTask] = useState<string>()

    useEffect(() => {
        textareaRef.current?.focus()
    }, [])

    const { profile } = useContext(ProfileContext)

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
                    "profile": profile
                })
            }
        )
    }


    return (
        <CustomAddTaskModal onClick={close}>
            <div className='modal' onClick={e => e.stopPropagation()}>
                <textarea value={task} onChange={e => setTask(e.target.value)} className='textarea' ref={textareaRef} />
                <div className='buttons'>
                    <button onClick={addTask} className='add_task'><IoAddCircle />Add task</button>
                    <button className='upload_file'><GoFileDirectory />Upload file</button>
                    {/* <div className='uploaded_file'></div> */}
                </div>
            </div>
        </CustomAddTaskModal>
    )
}

export default AddTaskModal