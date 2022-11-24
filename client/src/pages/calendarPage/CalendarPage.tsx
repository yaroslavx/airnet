import { FC, useEffect } from 'react'
import ExportButton from '../../components/exportButton/ExportButton';
import Table from '../../components/calendar/Calendar'
import { CustomCalendarPage } from './CalendarPage.styles'

const CalendarPage: FC = () => {
    return (
        <CustomCalendarPage>
            <div className='header'>
                <span className='title'>
                    {`[Today's month Today's date]`}
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