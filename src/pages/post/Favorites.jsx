import { useParams } from "react-router-dom"

export default function Favorites() {
    const { username } = useParams();


  return (
    <div className="pl-10">
        <h2 className=" text-start font-bold text-3xl">Favorites</h2>
    </div>
  )
}
