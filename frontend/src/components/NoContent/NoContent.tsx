import { ReactElement } from "react";

interface NoContentProps {
    icon: ReactElement;
    message: string;
}

function NoContent({ icon, message }: NoContentProps) {
    return (
        <div>
            {icon}
            <p>{message}</p>
        </div>
    );
}

export default NoContent;