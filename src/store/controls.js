
import apiFetch from '@wordpress/api-fetch';


var controls = {
    FETCH_LICENSE_FROM_API(action) {
        return apiFetch({ path: action.path, method: 'POST', data: {}, });
    },

    FETCH_CLIENTDATA_FROM_API(action) {
        return apiFetch({ path: action.path, method: 'POST', data: {}, });
    },

    FETCH_PRO_INFO_FROM_API(action) {
        console.log('step: 4');

        return apiFetch({ path: action.path, method: 'POST', data: {}, });
    },



}

export default controls;