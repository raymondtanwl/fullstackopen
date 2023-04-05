import { useContext } from 'react'
import NotifContext from '../context/notifContext'

export const EnumNotifType = {
  SuccessNotif: 1,
  ErrorNotif: -1,
}
const Notification = () => {
  const [notifPayload] = useContext(NotifContext)

  if (!notifPayload) return null

  const { message, type } = notifPayload
  const notifStyle = type === EnumNotifType.ErrorNotif ? 'error' : 'success'

  return <div className={'notification ' + notifStyle}>{message}</div>
}

export default Notification
