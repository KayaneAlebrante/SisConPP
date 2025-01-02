import imgLogo from "../assets/Logo-SisConPP.png";

function Login() {
  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-white-100 to-white-200 overflow-hidden">
      <div className="flex justify-center items-center h-full px-4 relative z-10">
        <form className="max-w-[500px] w-full bg-white-200/90 p-6 rounded-lg shadow-md relative">
          <div className="flex justify-center mb-6">
            <img src={imgLogo} alt="Logo Sistema" className="h-16 w-auto" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

          <div className="flex flex-col text-black-500 py-2">
            <label className="text-sm font-medium">Usuário</label>
            <input
              type="text"
              className="rounded-lg mt-1 p-2 bg-white-100 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-white-100"
              placeholder="Digite seu usuário"
            />
          </div>

          <div className="flex flex-col text-black-500 py-2">
            <label className="text-sm font-medium">Senha</label>
            <input
              type="password"
              className="rounded-lg mt-1 p-2 bg-white-100 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-white-100"
              placeholder="Digite sua senha"
            />
          </div>

          <div className="flex justify-center mt-2">
            <button type="button" className="text-sm text-orange-500 hover:underline">
              Esqueceu a senha?
            </button>
          </div>

          <button
            className="w-full mt-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition duration-200"
            type="submit"
          >
            Realizar Login!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
