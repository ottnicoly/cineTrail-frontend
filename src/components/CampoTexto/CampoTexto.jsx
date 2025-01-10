
import './CampoTexto.css'

const CampoTexto = (props) => {
    return (
        <div className='teste'>
            <div className='campo-texto'>
                <label>{props?.label}</label>
                <input type={props.tipo} required={props.obrigatorio} placeholder={props.nome} />
            </div>
        </div>
    )
}

export default CampoTexto