import { useUserLogin } from "../useUserLogin.js"
import { useRequestDB } from "../utils/useRequestDB.js"
import toast from "react-hot-toast"

export function useShowPassword(showPassword, setShowPassword, passwordToShow, setPasswordToShow) {

    const { userLogin } = useUserLogin()
    const { requestDB } = useRequestDB()
    
    // const [showPassword, setShowPassword] = useState(false)
    // const [passwordToShow, setPasswordToShow] = useState('')

    const handleClickShowPassword = async (conid) => {
        
        const resultDB = await requestDB(`main/get-password/${conid}/${userLogin.usuid}`, 'GET')
        if (!resultDB.ok) {
            toast.error(resultDB.message)
            return
        }

        setPasswordToShow(resultDB.data[0].conpwd)
        setShowPassword(true)
        setTimeout(() => { setShowPassword(false) }, 5000)
    }

    const handleClickCopyPassword = async (conid) => {

        const resultDB = await requestDB(`main/get-password/${conid}/${userLogin.usuid}`, 'GET')
        if (!resultDB.ok) {
            toast.error(resultDB.message)
            return
        }
        navigator.clipboard.writeText(resultDB.data[0].conpwd)
        toast.success('Contraseña copiada Exitosamente')
    }

    return { 
        showPassword, 
        passwordToShow, 
        handleClickShowPassword, 
        handleClickCopyPassword 
    }

}
