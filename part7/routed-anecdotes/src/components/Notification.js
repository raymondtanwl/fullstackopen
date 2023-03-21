const Notification = ({ notification }) => {
  return notification ?
    <div className='notification'>{ notification }</div>
    : null
}

export default Notification
