import './Formulario.css'
import CampoTexto from '../CampoTexto/CampoTexto'

const Formulario = (props) => {
    return (
        <div className='formulario'>
            <form>
                <h2>{props.nomeFormulario}</h2>
                <CampoTexto 
                label= 'Usuário:'
                nome='Digite seu usuário:'
                tipo='text'
                obrigatorio = 'true'
                />
                <CampoTexto 
                label= 'Senha:'
                nome='Digite sua senha:'
                tipo='password'
                obrigatorio = 'true'
                />
                <div className='botao'>
                <button>{props.nomeBotao}</button>
                </div>
            </form>
        </div>
    )
}

export default Formulario