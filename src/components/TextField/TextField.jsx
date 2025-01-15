import './TextField.css'

const TextField = (props) => {
    return (
        <div className='container'>
            <div className='text-field'>
                <label>{props?.label}</label>
                <input type={props.type} required={props.required} placeholder={props.name} value={props.value} onChange={props.onChange} />
            </div>
        </div>
    )
}

export default TextField