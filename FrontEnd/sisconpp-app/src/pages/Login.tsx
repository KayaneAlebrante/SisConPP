import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgLogo from "../assets/Logo-SisConPP.png";
import Wave from "../components/Wave/Wave";
import { loginUsuario } from "../services/api";
import { toast } from "react-toastify";

function Login() {
  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const data = await loginUsuario({ login: usuario, senha });

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      toast.success("Login realizado com sucesso!");
      console.log("Dados do usuário:", data.usuario);

      navigate("/tela-inicial");
    } catch (error: unknown) {
      let mensagem = "Falha no login. Verifique suas credenciais.";
      console.error("Erro no login:", error);

      if (error instanceof Error){
        mensagem = error.message;
      }
      
      

      setErro(mensagem);
      toast.error(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full bg-neutral-background overflow-hidden">
      <div className="flex justify-center items-center h-full px-4 relative z-10">
        <form
          onSubmit={handleLogin}
          className="max-w-[500px] w-full bg-surface-container p-6 rounded-lg shadow-md relative"
        >
          <div className="flex justify-center mb-6">
            <img src={imgLogo} alt="Logo Sistema" className="h-20 w-auto" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-4 text-neutral-onBackground">
            Login
          </h2>

          <div className="flex flex-col py-2">
            <label className="text-sm font-medium text-neutral-onBackground">
              Usuário
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="rounded-lg mt-1 p-2 bg-surface-containerHigh focus:outline-none focus:ring-2 focus:ring-primary border border-outline text-neutral-onBackground"
              placeholder="Digite seu usuário"
              required
            />
          </div>

          <div className="flex flex-col py-2">
            <label className="text-sm font-medium text-neutral-onBackground">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="rounded-lg mt-1 p-2 bg-surface-containerHigh focus:outline-none focus:ring-2 focus:ring-primary border border-outline text-neutral-onBackground"
              placeholder="Digite sua senha"
              required
            />
          </div>

          {erro && (
            <p className="text-red-500 text-sm text-center mt-2">{erro}</p>
          )}

          <div className="flex justify-center mt-2">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary-dark hover:underline"
            >
              Esqueceu a senha?
            </button>
          </div>

          <button
            className="w-full mt-4 py-2 bg-primary text-primary-on font-medium rounded-lg hover:bg-primary-dark transition duration-200 disabled:opacity-70"
            type="submit"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Realizar Login!"}
          </button>
        </form>
      </div>

      <Wave />
    </div>
  );
}

export default Login;
