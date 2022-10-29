import apiFetch from '@wordpress/api-fetch';
import { createReduxStore, register, subscribe, select } from '@wordpress/data';




const DEFAULT_STATE = {
  prices: {},
  discountPercent: 5656,
  choko: 'Milk Candy',
  price: 123,

  proUrl: 'http://getpostgrid.com/',

  breakPoint: 'Desktop',
  clientdata: {},

  license: { license_status: '', license_key: '' },


};

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


  setLicense(license) {
    ////console.log(license);

    return {
      type: 'SET_LICENSE',
      license,
    };

  },



  setPrice(item, price) {
    return {
      type: 'SET_PRICE',
      item,
      price,
    };
  },

  startSale(discountPercent) {
    return {
      type: 'START_SALE',
      discountPercent,
    };
  },

  fetchFromAPI(path) {
    return {
      type: 'FETCH_FROM_API',
      path,
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




};

const store = createReduxStore('postgrid-shop', {
  reducer(state = DEFAULT_STATE, action) {
    ////console.log(action.type);
    ////console.log(action.license);

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


      case 'SET_LICENSE':

        return {
          ...state,
          license: action.license,
        };


      case 'SET_PRICE':
        return {
          ...state,
          price: action.price,
        };

      case 'START_SALE':
        return {
          ...state,
          discountPercent: action.discountPercent,
        };
    }

    return state;
  },

  actions,

  selectors: {


    getProurl(state) {
      const { proUrl } = state;

      //return price * (1 - 0.01 * discountPercent);
      return proUrl;

    },


    getBreakPoint(state) {
      const { breakPoint } = state;

      //return price * (1 - 0.01 * discountPercent);
      return breakPoint;

    },

    getclientdata(state) {
      const { clientdata } = state;



      return clientdata;

    },


    getLicense(state) {
      const { license } = state;
      return license;

    },









    getPrice(state, item) {
      const { price, discountPercent } = state;
      //const price = prices[item];

      //return price * (1 - 0.01 * discountPercent);
      return price;

    },
    getData(state, item) {


      const { prices, discountPercent } = state;
      const price = prices[item];

      //return price * (1 - 0.01 * discountPercent);
      return 234234;

    },






  },

  controls: {
    FETCH_FROM_API(action) {
      return apiFetch({ path: action.path });
    },
    FETCH_LICENSE_FROM_API(action) {
      return apiFetch({ path: action.path, method: 'POST', data: {}, });
    },

    FETCH_CLIENTDATA_FROM_API(action) {
      return apiFetch({ path: action.path, method: 'POST', data: {}, });
    },


  },

  resolvers: {
    * getPrice(item) {
      const path = '/wp/v2/prices/' + item;
      const price = yield actions.fetchFromAPI(path);
      return actions.setPrice(item, price);
    },
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



  },
});

register(store);


subscribe(() => {




})

export { store };
