export default function MovieCard({title,poster}){
    return(
        <div className="hover:scale-105 duration-300  cursor-pointer	relative m-4 rounded-[1rem] overflow-hidden	">
            <img className="h-[20rem] w-[12rem] object-cover" src={poster}/>
            <p className="absolute left-[50%] bottom-2 translate-x-[-50%] text-white">{title}</p>
        </div>
    )
}