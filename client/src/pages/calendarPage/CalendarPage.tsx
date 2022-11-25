import { FC, useEffect } from 'react'
import ExportButton from '../../components/exportButton/ExportButton';
import Table from '../../components/calendar/Calendar'
import { CustomCalendarPage } from './CalendarPage.styles'

const CalendarPage: FC = () => {
    return (
        <CustomCalendarPage>
            <div className='header'>
                <span className='title'>
                    <span className='weekday'></span>{(new Date).toLocaleString("default", { weekday: "long" })}
                    {' '}
                    <span className='date'>
                        {(new Date).getDate()}
                        {' '}
                        {(new Date).toLocaleString("default", { month: "short" })}
                        {' '}
                        {(new Date).getFullYear()}
                    </span>
                </span>
                <div>
                    <ExportButton />
                </div>
            </div>
            <Table />
        </CustomCalendarPage>
    )
}

export default CalendarPage