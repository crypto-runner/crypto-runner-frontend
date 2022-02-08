import { useDispatch } from "react-redux"
import { notify } from "reapop"


const useNotify = () => {
    const dispatch = useDispatch()

    const notifyError = (message: string) => {
        dispatch(notify({ status: 'error', message: message }))
    }

    return { notifyError }
}

export default useNotify