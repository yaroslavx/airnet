import { createContext, Dispatch, FC, SetStateAction, useState } from 'react'
import LeftSide from '../leftSide/LeftSide'
import RightSide from '../rightSide/RightSide'
import { CustomCalendar } from './Calendar.styles'

type ContextType = {
    profile: string | null,
    setProfile: Dispatch<SetStateAction<string>>
}

const initialState = {
    profile: 'default_profile',
    setProfile: () => { }
}

export const ProfileContext = createContext<ContextType>(initialState);

const Calendar: FC = () => {
    const [profile, setProfile] = useState(initialState.profile);
    return (
        <CustomCalendar>
            <ProfileContext.Provider value={{ profile, setProfile }} >
                <LeftSide />
                <RightSide />
            </ProfileContext.Provider>
        </CustomCalendar>
    )
}

export default Calendar