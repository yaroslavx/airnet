import React, { FC, useEffect, useRef } from 'react'
import { CustomAddTaskModal } from './AddTaskModal.styles'
import { IoAddCircle } from 'react-icons/io5'
import { BsFileEarmarkFill } from 'react-icons/bs'

import { MdOutlineAttachFile } from 'react-icons/md'
import { GoFileDirectory } from 'react-icons/go'


type ModalProps = {
    close: () => void
}

const AddTaskModal: FC<ModalProps> = ({ close }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        textareaRef.current?.focus()
    }, [])

    return (
        <CustomAddTaskModal onClick={close}>
            <div className='modal' onClick={e => e.stopPropagation()}>
                <textarea className='textarea' ref={textareaRef} />
                <div className='buttons'>
                    <button className='add_task'><IoAddCircle />Add task</button>
                    <button className='upload_file'><GoFileDirectory />Upload file</button>
                    {/* <div className='uploaded_file'></div> */}
                </div>
            </div>
        </CustomAddTaskModal>
    )
}

export default AddTaskModal