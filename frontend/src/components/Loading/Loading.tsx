import { CircularProgress } from "@mui/material";

interface LoadingProps {
    message: string;
}

function Loading({ message }: LoadingProps) {
    return ( 
        <>
            <CircularProgress />
            <p>{message}</p>
        </>
     );
}

export default Loading;