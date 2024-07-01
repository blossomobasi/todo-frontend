import { useUser } from "../hooks/auth/useUser";

function WelcomeMessage() {
    const { user } = useUser();

    return (
        <h1 className="text-2xl mt-5 capitalize">
            Welcome
            <span className="ml-2 font-extrabold">{user?.username},</span>
            <br />
            What is you task for today?
        </h1>
    );
}

export default WelcomeMessage;
