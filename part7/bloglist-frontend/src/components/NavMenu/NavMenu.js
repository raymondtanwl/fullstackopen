/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import LoginContext from '../../context/loginContext'
import { Button, Breadcrumb, Layout, Menu, theme } from 'antd'
const { Header, Content, Footer } = Layout
import 'antd/dist/reset.css'
import './NavMenu.css'

const NavMenu = () => {
  const [loginPayload, loginDispatch] = useContext(LoginContext)

  const handleLogout = () => {
    // console.log('handleLogout')
    window.localStorage.clear()
    // setUser(null)
    loginDispatch({ type: 'LOGOUT' })
  }

  if (!loginPayload) return null

  // return (
  //   <div className="nav-menu">
  //     <Link to="/">blogs</Link>
  //     <Link to="/users">users</Link>
  //     <div>{loginPayload && loginPayload.name} logged in</div>
  //     <button onClick={handleLogout}>logout</button>
  //   </div>
  // )

  return (
    <div>
      <Layout className="layout">
        <Header className="header">
          <Button type="link">
            <Link to="/">blogs</Link>
          </Button>
          <Button type="link">
            <Link to="/users">users</Link>
          </Button>
          <span>{loginPayload && loginPayload.name} logged in</span>
          <Button type="primary" onClick={handleLogout}>Logout</Button>
        </Header>
      </Layout>


    </div>
  )

  // return (
  //   <NavigationMenu.Root className="NavigationMenuRoot">
  //     <NavigationMenu.List className="NavigationMenuList">
  //       <NavigationMenu.Item>
  //         <NavigationMenu.Link className="NavigationMenuLink" href="/">
  //           blogs
  //         </NavigationMenu.Link>
  //       </NavigationMenu.Item>
  //       <NavigationMenu.Item>
  //         <NavigationMenu.Link className="NavigationMenuLink" href="/users">
  //           users
  //         </NavigationMenu.Link>
  //       </NavigationMenu.Item>

  //       <NavigationMenu.Item>
  //         <div>{loginPayload && loginPayload.name} logged in</div>
  //       </NavigationMenu.Item>

  //       <NavigationMenu.Item>
  //         <button className="Button" onClick={handleLogout}>logout</button>
  //       </NavigationMenu.Item>

  //     </NavigationMenu.List>

  //   </NavigationMenu.Root>
  // )
}

export default NavMenu
