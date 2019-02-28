import React, { useState } from 'react'
import { Link} from '@reach/router'
import styles from './Confirmation.module.css'
import firebase from '../Firebase/firebase'

const Confirmation = props => {
    
return (
    <div>
        <p> Thank you for creating an account! </p>
        <p>  A confirmation email has been sent to your email at {props.email} </p>
    </div>

)



}

export default Confirmation