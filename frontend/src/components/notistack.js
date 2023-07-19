import { useSnackbar , SnackbarProvider } from "notistack"

const Notistack = ()=>{
    const {enqueueSnackbar} = useSnackbar()
    const handleeClick = ()=>{
        enqueueSnackbar({message:"hello snack" , variant:"success"})
    }
    return(
        <button onClick={handleeClick}>btn</button>
    )
}

const NotistakComponent = ()=>{
    return(
        <SnackbarProvider maxSnack={3}  autoHideDuration={3000} anchorOrigin={{vertical:"top" , horizontal:"left"}}>
            <Notistack />
        </SnackbarProvider>
    )
}

export default NotistakComponent