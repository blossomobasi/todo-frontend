import Nav from "./Nav";

function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="w-[22rem]">
                <Nav />
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;
