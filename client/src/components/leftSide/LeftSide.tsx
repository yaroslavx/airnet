import { FC, useContext, useEffect, useState } from 'react'
import { CustomLeftSide } from './LeftSide.styles'
import { IoAddCircle } from 'react-icons/io5'
import { ProfileContext } from '../calendar/Calendar'
import AddProfileModal from '../addProfileModal/AddProfileModal'

export type ProfileType = {
    profileId: number,
    profile: string
}

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

    const [profiles, setProfiles] = useState<ProfileType[]>()
    const [profileTitle, setProfileTitle] = useState<string>()

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:8080'
    }

    const { profileId, setProfile } = useContext(ProfileContext);

    useEffect(() => {
        const fetchProfiles = async () => {

            const responce = await fetch('http://localhost:5000/api/profiles')
            const profilesFromApi = await responce.json()

            setProfiles(profilesFromApi)

        }
        fetchProfiles()
    }, [])

    const [modalPopup, setModalPopup] = useState(false)

    const handlePopup = () => {
        setModalPopup(prev => !prev)
    }

    console.log(profiles)
    return (
        <CustomLeftSide width={size.x}>
            <button className='resize' onMouseDown={handler}><div className='handle'></div></button>
            <div className='leftside_header'>
                Profiles
            </div>
            <div className='add_bar'>
                <div onClick={handlePopup} className='add_button'><IoAddCircle />Add Profile</div>
            </div>

            <div className='profiles'>
                {profiles && profiles.map(profile =>
                    <div onClick={() => setProfile(profile.profileId)} className={`${profile.profileId === profileId ? 'selected profile_container' : 'profile_container'}`}>
                        <div
                            className='profile'>
                            {profile.profile}
                        </div>
                    </div>)}

            </div>
            {modalPopup && <AddProfileModal close={handlePopup} setProfiles={setProfiles} />}
        </CustomLeftSide>
    )
}

export default LeftSide