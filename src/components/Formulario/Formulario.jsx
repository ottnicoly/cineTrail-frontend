import './Formulario.css'
import CampoTexto from '../CampoTexto/CampoTexto'

const Formulario = (props) => {
    return (
        <div className='formulario'>
            <form onSubmit={props.onSubmit}>
                <h2>{props.nomeFormulario}</h2>
                <CampoTexto 
                label= 'Usuário:'
                nome='Digite seu usuário:'
                tipo='text'
                obrigatorio = 'true'
                value={props.loginValue}
                onChange={props.onLoginChange}
                />
                <CampoTexto 
                label= 'Senha:'
                nome='Digite sua senha:'
                tipo='password'
                obrigatorio = 'true'
                value={props.senhaValue}
                onChange={props.onSenhaChange}
                />
                <div className='botao'>
                <button>{props.nomeBotao}</button>
                </div>
            </form>
        </div>
    )
}

export default Formulario