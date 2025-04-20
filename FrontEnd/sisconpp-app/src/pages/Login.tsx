import imgLogo from "../assets/Logo-SisConPP.png";
import Wave from "../components/Wave/Wave";

function Login() {
  return (
    <div className="relative h-screen w-full bg-neutral-background overflow-hidden">
      <div className="flex justify-center items-center h-full px-4 relative z-10">
        <form className="max-w-[500px] w-full bg-surface-container p-6 rounded-lg shadow-md relative">
          <div className="flex justify-center mb-6">
            <img src={imgLogo} alt="Logo Sistema" className="h-20 w-auto" />
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-4 text-neutral-onBackground">Login</h2>

          <div className="flex flex-col py-2">
            <label className="text-sm font-medium text-neutral-onBackground">Usuário</label>
            <input
              type="text"
              className="rounded-lg mt-1 p-2 bg-surface-containerHigh focus:outline-none focus:ring-2 focus:ring-primary border border-outline text-neutral-onBackground"
              placeholder="Digite seu usuário"
            />
          </div>

          <div className="flex flex-col py-2">
            <label className="text-sm font-medium text-neutral-onBackground">Senha</label>
            <input
              type="password"
              className="rounded-lg mt-1 p-2 bg-surface-containerHigh focus:outline-none focus:ring-2 focus:ring-primary border border-outline text-neutral-onBackground"
              placeholder="Digite sua senha"
            />
          </div>

          <div className="flex justify-center mt-2">
            <button type="button" className="text-sm text-primary hover:text-primary-dark hover:underline">
              Esqueceu a senha?
            </button>
          </div>

          <button
            className="w-full mt-4 py-2 bg-primary text-primary-on font-medium rounded-lg hover:bg-primary-dark transition duration-200"
            type="submit"
          >
            Realizar Login!
          </button>
        </form>
      </div>
      <Wave />
    </div>
  );
}

export default Login;
