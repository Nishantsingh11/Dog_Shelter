import { PawPrint } from 'lucide-react'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logoutUser, setLoginState } from '@/Store/Slice/Auth.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast"

const Header = ({ loginstatus }) => {
    const {toast} = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await dispatch(logoutUser()).unwrap()
        localStorage.removeItem("accessToken")
        toast({
            title: "Logged out successfully",
            type: "success",
        })
        dispatch(setLoginState(false)); // Manually set login state to false
        navigate('/')
    }
    return (
        <div>
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" to="/">
                    <PawPrint className="h-6 w-6 text-primary" />
                    <h1 className="text-xl font-bold ml-1">Second Chance Paws</h1>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" to="/">
                        Home
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" to="/about">
                        About
                    </Link>



                    {
                        loginstatus ?
                            <>
                                <Link to="/dogsList" className="text-sm font-medium hover:underline underline-offset-4" >
                                    Dogs
                                </Link>

                                <Link to="/Newdog" className="text-sm font-medium hover:underline underline-offset-4" href="#">
                                    Add New Dog
                                </Link>
                                <Link className="text-sm font-medium hover:underline underline-offset-4" onClick={handleLogout}>
                                    Logout
                                </Link>
                                <Link to="/admin/profile">
                                    <Avatar className="w-8 h-8">

                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>SC</AvatarFallback>

                                    </Avatar>
                                </Link>


                            </>
                            :
                            <Link to="/userauth" className="text-sm font-medium hover:underline underline-offset-4" href="#">
                                Register / Login

                            </Link>
                    }
                </nav>
            </header>
        </div>
    )
}
Header.propTypes = {
    loginstatus: PropTypes.bool.isRequired,
};

export default Header
