import { useContext } from 'react'
import NotifContext from '../context/notifContext'

const Notification = () => {
  const [notifMsg] = useContext(NotifContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (!notifMsg) return null

  return (
    <div style={style}>
      { notifMsg }
    </div>
  )
}

export default Notification
