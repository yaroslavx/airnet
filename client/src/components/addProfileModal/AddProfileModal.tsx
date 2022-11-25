import { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { IoAddCircle } from 'react-icons/io5'
import { CustomAddProfileModal } from './AddProfileModal.styles'
import { ProfileContext } from '../calendar/Calendar'
import { ProfileType } from '../leftSide/LeftSide'

type ModalProps = {
  close: () => void
  setProfiles: Dispatch<SetStateAction<ProfileType[] | undefined>>
}

const AddProfileModal: FC<ModalProps> = ({ close, setProfiles }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [profileTitle, setProfileTitle] = useState<string>()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const { profileId } = useContext(ProfileContext)

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Origin: 'http://localhost:8080',
  }

  const createProfile = async () => {
    await fetch('http://localhost:5000/api/profiles',
      {
        mode: 'no-cors',
        credentials: 'include',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          "profile": profileTitle
        })
      }
    )
    const responce = await fetch('http://localhost:5000/api/profiles')
    const profilesFromApi = await responce.json()
    setProfiles(profilesFromApi)
    close()
  }

  return (
    <CustomAddProfileModal onClick={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <input
          value={profileTitle}
          onChange={(e) => setProfileTitle(e.target.value)}
          className="textarea"
          ref={inputRef}
        />
        <div className="buttons">
          <button onClick={createProfile} className="add_task">
            <IoAddCircle />
            Create profile
          </button>
        </div>
      </div>
    </CustomAddProfileModal>
  )
}

export default AddProfileModal
