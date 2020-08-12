import React, {useState} from 'react';
import { connect } from 'react-redux';

import { editProfile } from '../../actions/appActions.js';

function EditProfileForm (props) {

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps, {editProfile})(EditProfileForm);