import apiFetch from '@wordpress/api-fetch';
import { createReduxStore, register, subscribe, select } from '@wordpress/data';






const DEFAULT_STATE = {
  breakPoint: 'Desktop',
  clientdata: {},
  proinfo: { proInstalled: false, status: 'inactive-initial' },
  license: { license_status: '', license_key: '' },
};

var selectors = {

  getBreakPoint(state) {
    const { breakPoint } = state;
    return breakPoint;
  },
  getclientdata(state) {
    const { clientdata } = state;
    return clientdata;
  },
  getproinfo(state) {
    console.log('step: 1');

    const { proinfo } = state;

    console.log(proinfo);

    return proinfo;
  },
  getLicense(state) {
    const { license } = state;
    return license;
  },

};


var resolvers = {



  * getLicense() {
    const path = '/post-grid/v2/get_license';
    const res = yield actions.fetchLicense(path);
    ////console.log(res);

    return actions.setLicense(res);
  },



  * getclientdata() {
    const path = '/post-grid/v2/get_site_details';
    const res = yield actions.fetchclientdata(path);

    ////console.log(res);


    return actions.setclientdata(res);
  },


  * getproinfo() {

    console.log('step: 2');



    const path = '/post-grid/v2/get_pro_info';
    const res = yield actions.fetchproinfo(path);

    console.log(res);


    return actions.setproinfo(res);
  },



}



const actions = {
  setBreakPoint(breakpoint) {
    return {
      type: 'SET_BREAKPOINT',
      breakpoint,
    };
  },
  setclientdata(clientdata) {
    return {
      type: 'SET_CLIENTDATA',
      clientdata,
    };
  },
  setproinfo(proinfo) {

    console.log('step: 3');
    console.log(proinfo);

    return {
      type: 'SET_PROINFO',
      proinfo,
    };
  },
  setLicense(license) {
    return {
      type: 'SET_LICENSE',
      license,
    };
  },
  fetchLicense(path) {
    return {
      type: 'FETCH_LICENSE_FROM_API',
      path,
    };
  },
  fetchclientdata(path) {
    return {
      type: 'FETCH_CLIENTDATA_FROM_API',
      path,
    };
  },
  fetchproinfo(path) {
    console.log('step: 4');

    return {
      type: 'FETCH_PRO_INFO_FROM_API',
      path,
    };
  },

};



var controls = {
  FETCH_LICENSE_FROM_API(action) {
    return apiFetch({ path: action.path, method: 'POST', data: {}, });
  },

  FETCH_CLIENTDATA_FROM_API(action) {
    return apiFetch({ path: action.path, method: 'POST', data: {}, });
  },

  FETCH_PRO_INFO_FROM_API(action) {
    console.log('step: 5');

    return apiFetch({ path: action.path, method: 'POST', data: {}, });
  },



}



const store = createReduxStore('postgrid-shop', {
  reducer(state = DEFAULT_STATE, action) {




    switch (action.type) {

      case 'SET_BREAKPOINT':
        return {
          ...state,
          breakPoint: action.breakpoint,
        };

      case 'SET_CLIENTDATA':
        return {
          ...state,
          clientdata: action.clientdata,
        };

      case 'SET_PROINFO':

        console.log('step: 3');
        console.log(action.proinfo);


        return {
          ...state,
          proinfo: action.proinfo,
        };

      case 'SET_LICENSE':
        return {
          ...state,
          license: action.license,
        };


    }

    return state;
  },

  actions,
  selectors,
  controls,
  resolvers,
});

register(store);


subscribe(() => {

})

export { store };
