import Logo from "@/assets/logo.png"
export default function Nav(props: {name:string}) {
    return(
        <div className="bg-primary-100 h-[50px] top-0 z-30 w-full fixed flex py-6 items-center justify-between">
            <img alt="logo" src={Logo} className="ml-5" />
            <div className="links flex gap-8 p-5 text-lg">
                <button className="text-primary-500 rounded-md p-1 hover:bg-primary-300 hover:text-white">{props.name}</button>
                <button className="text-primary-500 rounded-md p-1 hover:bg-primary-300 hover:text-white">Show all</button>
                <button className="text-primary-500 rounded-md p-1 hover:bg-primary-300 hover:text-white">Surprise Me</button>
            </div>
        </div>
    )
}