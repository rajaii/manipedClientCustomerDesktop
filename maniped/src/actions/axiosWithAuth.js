import axios from 'axios';

export default function() {
    const token = localStorage.getItem('token');
    console.log(token)
    return axios.create({
        headers : {
            'Content-Type': 'application/json',
            'xcustomheaders': `${token}`,
        }
    })
}