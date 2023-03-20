import { Link } from "react-router-dom"

const Menu = ({ toPage }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      {/* <a href='anecdotes' onClick={toPage('anecdotes')} style={padding}>anecdotes</a>
      <a href='create-new' onClick={toPage('create-new')} style={padding}>create new</a>
      <a href='about' onClick={toPage('about')} style={padding}>about</a> */}
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

export default Menu
