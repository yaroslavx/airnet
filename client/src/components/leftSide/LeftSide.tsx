import { FC, useContext, useEffect, useState } from 'react'
import { CustomLeftSide } from './LeftSide.styles'
import Task from '../day/Day'
import { IoAddCircle } from 'react-icons/io5'
import axios from 'axios'
import { ProfileContext } from '../calendar/Calendar'



const LeftSide: FC = () => {
    const [size, setSize] = useState({ x: 370 });

    // Left side resizer
    const handler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        const startSize = size;
        const startPosition = { x: e.pageX };

        function onMouseMove(mouseMoveEvent: MouseEvent) {
            setSize(currentSize => ({
                x: startSize.x - startPosition.x + mouseMoveEvent.pageX,
            }));
        }
        function onMouseUp() {
            document.body.removeEventListener("mousemove", onMouseMove);
        }

        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp, { once: true });
    };

    const [profiles, setProfiles] = useState<string[]>([])

    const createProfile = () => {
        setProfiles(prev => [...prev, 'new_profile'])
    }

    const { profile, setProfile } = useContext(ProfileContext);

    return (
        <CustomLeftSide width={size.x}>
            <button className='resize' onMouseDown={handler}><div className='handle'></div></button>
            <div className='leftside_header'>
                Profiles
            </div>
            <div className='add_bar'>
                <div className='add_button' onClick={createProfile}><IoAddCircle />Add Profile</div>

            </div>

            <div className='profiles'>
                {profiles.map(profile => <div onClick={() => setProfile(profile)} className='profile'>{profile}</div>)}

            </div>
        </CustomLeftSide>
    )
}

export default LeftSide