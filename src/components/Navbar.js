import { useLogout } from "../hooks/useLogout"
import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"


const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return(
        <header>
            <div className="container">
                <Link to='/'>
                    <h1>tracker</h1>
                </Link>
                <nav>
                    {user && (
                        <Link className="createBtn" to='/create'>
                            <button><strong>Add Transaction</strong></button>
                        </Link>
                    )}
                    {user && (<div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Logout</button>
                    </div>)}
                    {!user && (<div>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </div>)}
                </nav>
            </div>
        </header>
    )
}

export default Navbar