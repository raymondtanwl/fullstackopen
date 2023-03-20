import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteDetail from './components/AnecdoteDetail'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'


const App = () => {
  const [page, setPage] = useState('home')
  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }
  const renderContent = () => {
    switch (page) {
      case 'anecdotes':
        return <AnecdoteList anecdotes={anecdotes} />
      case 'create-new':
        return <CreateNew addNew={addNew} />
      case 'about':
        return <About/>
      default:
        <AnecdoteList anecdotes={anecdotes} />
    }
  }
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

    triggerNotification(`a new anecdote '${ anecdote.content }' is created!`)
    // causes error: useNavigate() may be used only in the context of a <Router> component.
    // Due to this App component is not being wrapped by <Router>. 
    // Solve by either wrapping <Router><App /></Router> in index.js or invoke in component one level down.
    // navigate('/') 
  }

  const triggerNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu toPage={toPage} />
        { 
          // renderContent() 
          /* <AnecdoteList anecdotes={anecdotes} />
          <About />
          <CreateNew addNew={addNew} /> */
        }

        <Notification notification={notification} />

        <Routes>
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/anecdote/:id" element={<AnecdoteDetail anecdotes={anecdotes} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
