
import {Container, Logo} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const loading = useSelector((state) => state.auth.loading);

  const navigate = useNavigate()

  const navItems = [ 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "Checklist",
      slug: "/checklist",
      active: authStatus,
  },
  {
      name: "History",
      slug: "/history",
      active: authStatus,
  },
  {
      name: "Dashboard",
      slug: "/dashboard",
      active: authStatus,
  },
  ]

  if(loading) return (
    <div className='py-3 mr-4 ml-48'>

    <Logo width='70px'/>
    </div>
  )

  return (
    <header className='py-3 shadow px-48'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
              <Logo width='70px'   />
          </div>
          <ul className='flex ml-auto '>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock py-1 ml-1 font-sans text-lg font-extralight px-6 duration-200 hover:cursor-pointer hover:bg-gray-200 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header