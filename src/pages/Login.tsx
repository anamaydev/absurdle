import { useAuthContext } from "../contexts/useAuthContext";
import LockedIcon from "../components/icons/LockedIcon";
import GoogleIcon from "../components/icons/GoogleIcon";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {signInWithGoogle} = useAuthContext();
  const navigate = useNavigate();

  async function signIn() {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="min-h-dvh flex justify-center items-center relative">
      <div className="absolute -z-10 inset-0 opacity-25 bg-[url(src/assets/images/marble-background.png)]"></div>
      <section className="p-3 flex flex-col gap-6 border rounded-[28px] bg-black-900 border-grey-900">
        {/* logo + animation*/}
        <div className="flex flex-col gap-6">
          <LockedIcon/>
          <div className="row-frame flex gap-3">
            {new Array(5).fill(0).map((_,index)=>
              <div key={index} className="size-13 border-2 border-grey-800 rounded-xl">{""}</div>
            )}
          </div>
        </div>
        <p className="text-4xl font-rhodium-libre">Only <br/> the sharpest <br/> minds survive</p>
        <div className="flex flex-col gap-2">
          <p className="text-md text-center font-rhodium-libre">Sign In With</p>
          <button 
            className="p-2.5 group flex justify-center items-center gap-2.5 rounded-2xl cursor-pointer bg-grey-900 hover:bg-grey-50 transform transition-colors duration-300 ease-out"
            onClick={signIn}
          >
            <GoogleIcon/>
            <p className="font-roboto text-md font-normal group-hover:text-grey-900">Google</p>
          </button>
        </div>
      </section>
    </main>
  )
}
export default Login
