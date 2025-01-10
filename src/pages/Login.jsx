import Formulario from '../components/Formulario/Formulario'
import './Login.css'

const Login = () => {
    return (
        <div className='login'>
            <Formulario 
            nomeFormulario='Login'
            nomeBotao='Entrar'
            />
        </div> 
    )
}

export default Login