import { createContext, Dispatch, FC, SetStateAction, useState } from 'react'
import LeftSide from '../leftSide/LeftSide'
import RightSide from '../rightSide/RightSide'
import { CustomCalendar } from './Calendar.styles'

type ContextType = {
    profileId: number | null,
    setProfile: Dispatch<SetStateAction<number>>
}

const initialState = {
    profileId: 1,
    setProfile: () => { }
}

export const ProfileContext = createContext<ContextType>(initialState);

const Calendar: FC = () => {
    const [profileId, setProfile] = useState(initialState.profileId);
    return (
        <CustomCalendar>
            <ProfileContext.Provider value={{ profileId, setProfile }} >
                <LeftSide />
                <RightSide />
            </ProfileContext.Provider>
        </CustomCalendar>
    )
}

export default Calendar