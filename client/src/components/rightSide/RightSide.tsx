import { FC, useContext, useEffect, useRef, useState } from 'react'
import { CustomRightSide } from './RightSide.styles'
import { IoAddCircleOutline } from 'react-icons/io5'
import AddTaskModal from '../addTaskModal/AddTaskModal';
import { ProfileContext } from '../calendar/Calendar';
import TasksModal from '../tasksModal/TasksModal';

export type TaskType = {
    taskId: number,
    task: string,
    task_date: string,
    profileId: string
}

const RightSide: FC = () => {
    function formatDates(inputDate: Date) {
        let month =
            +inputDate.getMonth() + 1 < 10
                ? "0" + (+inputDate.getMonth() + 1)
                : +inputDate.getMonth() + 1;
        let date =
            +inputDate.getDate() < 10
                ? "0" + inputDate.getDate()
                : inputDate.getDate();
        return inputDate.getFullYear() + "-" + month + "-" + date;
    }

    let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
    let firstDay = formatDates(new Date(y, m - 2, 1));
    let lastDay = formatDates(new Date(y, m + 3, 0));
    const initialState = [firstDay, lastDay]

    const [dateRange, setDateRange] = useState<string[]>(initialState);

    function weekdays(loopDate: Date, loopEndDate: Date) {
        const today = formatDates(new Date());
        let newWeekDays = [];
        while (loopDate <= loopEndDate) {
            newWeekDays.push({
                dayName: loopDate.toLocaleString("default", { weekday: "short" }),
                dayNo: loopDate.getDate(),
                actualDate: formatDates(loopDate),
                date: new Date(loopDate),
                isToday: formatDates(loopDate) === today
            });

            let newDate = loopDate.setDate(loopDate.getDate() + 1);
            loopDate = new Date(newDate);
        }
        return newWeekDays;
    }

    const days = weekdays(new Date(dateRange[0]), new Date(dateRange[1]))

    const handleScroll = () => {
        let e: HTMLElement | null = document.getElementById("calendar");
        console.log(e)
        if (e) {
            if (e.scrollTop + (e.clientHeight) >= (e.scrollHeight - 250)) {
                let fDate = new Date(dateRange[0]);
                let fY = fDate.getFullYear(),
                    fM = fDate.getMonth();
                let firstDate = formatDates(new Date(fY, fM + 2, 0));
                let lDate = new Date(dateRange[1]);
                let lY = lDate.getFullYear(),
                    lM = lDate.getMonth();
                let lastDay = formatDates(new Date(lY, lM + 2, 0));
                setDateRange([firstDate, lastDay]);
            } else if (e.scrollTop <= 450) {
                let fDate = new Date(dateRange[0]);
                let fY = fDate.getFullYear(),
                    fM = fDate.getMonth();
                let firstDay = formatDates(new Date(fY, fM - 2, 1));
                let lDate = new Date(dateRange[1]);
                let lY = lDate.getFullYear(),
                    lM = lDate.getMonth();
                let lastDay = formatDates(new Date(lY, lM - 2, 1));
                setDateRange([firstDay, lastDay]);
            }
        }
    };

    const scrollToCurrentDay = () => {
        setDateRange(initialState)
        const e: HTMLElement | null = document.getElementById("calendar");
        if (e && parentRef.current) e.scrollTop = parentRef.current?.clientHeight / 5 * 12
    }

    useEffect(() => {
        scrollToCurrentDay()
    }, [])

    const currentDayRef = useRef(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const [modalPopup, setModalPopup] = useState(false)
    const [tasksPopup, setTasksPopup] = useState(false)
    const [openedTaskDate, setOpenedTaskDate] = useState<string>()

    const handlePopup = () => {
        setModalPopup(prev => !prev)
    }

    const handleTasksPopup = () => {
        setTasksPopup(prev => !prev)
    }

    const { profileId } = useContext(ProfileContext)

    const [tasks, setTasks] = useState<TaskType[]>()

    useEffect(() => {
        const fetchProfileTasks = async () => {
            const responce = await fetch(`http://localhost:5000/api/tasks/${profileId}`)
            const profileTasksFromApi = await responce.json()
            setTasks(profileTasksFromApi)

        }
        fetchProfileTasks()
    }, [profileId])


    console.log(tasks ? tasks.find(task => task.task_date === '2022-12-03')?.task : '')

    return (
        <CustomRightSide
        >
            <div className='rightside_header' >
                <button onClick={scrollToCurrentDay} className='current_day'>Current day</button>
            </div>

            <div className='days'
                ref={parentRef}
                id="calendar"
                onScroll={handleScroll}
            >
                {days.map(day =>
                    <div key={day.actualDate}
                        ref={day.isToday ? currentDayRef : null}
                        id={day.actualDate}
                        className='day_container'>
                        <div className='day'>
                            <div className={`${day.isToday ? 'today date' : 'date'}`}>{day.dayNo}</div>
                            <div className='date_description'>
                                <div>
                                    {day.dayName} {day.date.getFullYear()}
                                </div>
                                <div>{day.date.toLocaleDateString("default", { month: "short" })}</div>
                            </div>
                            <div onClick={() => { handleTasksPopup(), setOpenedTaskDate(day.actualDate) }} className='tasks'>
                                {tasks ? tasks.filter(task => task.task_date === day.actualDate).map(task => <div className='task'>{task.task}</div>) : ''}
                            </div>
                            <button onClick={() => { handlePopup(), setOpenedTaskDate(day.actualDate) }} className='add_task'><IoAddCircleOutline /></button>
                        </div>
                    </div>)}
            </div>
            {tasksPopup && <TasksModal setTasks={setTasks} tasks={tasks} close={handleTasksPopup} taskDate={openedTaskDate} />}
            {modalPopup && <AddTaskModal setTasks={setTasks} close={handlePopup} taskDate={openedTaskDate} />}
        </CustomRightSide >
    )
}

export default RightSide