import './Form.css'
import TextField from '../TextField/TextField'

const Form = (props) => {
    return (
        <div className='formulario'>
            <form onSubmit={props.onSubmit}>
                <h2>{props.formName}</h2>
                <TextField
                label= 'Usuário:'
                name='Digite seu usuário:'
                type='text'
                required = 'true'
                value={props.loginValue}
                onChange={props.onLoginChange}
                />
                <TextField
                label= 'Senha:'
                name='Digite sua senha:'
                typo='password'
                required = 'true'
                value={props.passwordValue}
                onChange={props.onPasswordChange}
                />
                <div className='botao'>
                <button>{props.buttonName}</button>
                </div>
            </form>
        </div>
    )
}

export default Form