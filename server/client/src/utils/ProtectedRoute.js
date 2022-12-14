import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    return (<>
        {
            (useSelector(s => s.user.username) === '') ?
                <Navigate to='/login' /> : children
        }
        
        
    </>)
}

export default ProtectedRoute
