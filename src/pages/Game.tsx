import { useAuthContext } from "../contexts/useAuthContext";
import Navbar from "../components/Navbar";
import Main from "../components/Main";

const Game = () => {
  const {wordListLoading} = useAuthContext();

  if(wordListLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar/>
      <Main/>
    </div>
  )
}
export default Game