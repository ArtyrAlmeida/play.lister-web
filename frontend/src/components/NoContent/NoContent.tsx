import { ReactElement } from "react";

interface NoContentProps {
    icon: ReactElement;
    message: string;
}

function NoContent({ icon, message }: NoContentProps) {
    return (
        <>
            {icon}
            <p>{message}</p>
        </>
    );
}

export default NoContent;