
import {toast} from 'react-toastify'

export const handleSuccess = (msg) => {
     toast.success(msg, {
        //position: 'top-right'
       // position: toast.POSITION.TOP_CENTER
        position: "top-right"
     })
}

export const handleError = (msg) => {
        toast.error(msg, {
           // position: 'center'
            //position: toast.POSITION.TOP_CENTER
            position: "top-right"
        })
}