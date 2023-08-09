import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye, faE } from '@fortawesome/free-solid-svg-icons'


class FormInput extends Component {
    state = {
        passIcon: faEye,
    }

    render() {
        const { placeholder, type, value, className, icon, name, change, pattern } = this.props
        const { passIcon } = this.state

        const changeIcon = () => passIcon === faEye ? this.setState({ passIcon: faEyeSlash }) : this.setState({ passIcon: faEye })

        return (
            <div className="input-group">
                <input required pattern={pattern} type={type === 'password' && passIcon === faEye ? 'password' : 'text'} className={className} value={value} name={name} onChange={change}></input>
                <span>{placeholder}</span>
                {type === 'password' && <span className="show-password"><FontAwesomeIcon icon={passIcon} onClick={changeIcon} /></span>}
            </div>
        )
    }
}

export default FormInput