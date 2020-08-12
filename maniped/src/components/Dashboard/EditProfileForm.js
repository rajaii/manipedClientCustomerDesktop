import React, {useState} from 'react';
import { connect } from 'react-redux';

import { editProfile, fetchUserInfo } from '../../actions/appActions.js';

function EditProfileForm (props) {
    const { info, setInfo } = useState({});

    function handleChange(e) {
        setInfo({
            [e.target.name]: e.target.value 
        })
    }

    function handleSubmit(e) {
        //validate the info with yup
        const userId = localStorage.getItem('uID');
        e.preventDefault();
        props.editProfile(userId, info);

    }

    return (
        <div>
            <form type='submit' onSubmit={handleSubmit}>
                <input
                type='text'
                onChange={handleChange}
                placeholder={`Edit ${props.thing}`}
                value={info}
                name={props.name}
                />

            </form>
        </div>
    )
}



export default connect(null, { editProfile, fetchUserInfo })(EditProfileForm);