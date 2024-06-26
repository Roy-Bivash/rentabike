import LoadingGif from "../../assets/gif/loading.gif";

export default function Loader(){
    return(
        <div className="z-90 fixed top-0 left-0 bg-white h-[100vh] w-[100vw]">
            <div className="flex flex-col items-center justify-center h-[80%]">
                <img src={LoadingGif} className="w-[60vw] md:w-[26vw]" alt="" />
                <h4 className="text-3xl text-center">
                    Loading..
                    <span className="animate-bounce inline-block">.</span>
                </h4>
            </div>
        </div>
    )
}