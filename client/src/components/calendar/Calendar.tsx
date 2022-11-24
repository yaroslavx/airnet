import { createContext, FC, useState } from 'react'
import LeftSide from '../leftSide/LeftSide'
import RightSide from '../rightSide/RightSide'
import { CustomCalendar } from './Calendar.styles'



const initialState = { profile: 'default_profile' }

export const Context = createContext(initialState);

const Calendar: FC = () => {
    const [context, setContext] = useState('default_profile');
    return (
        <CustomCalendar>
            <Context.Provider value={[context, setContext]}>
                <LeftSide />
                <RightSide />
            </Context.Provider>
        </CustomCalendar>
    )
}

export default Calendar