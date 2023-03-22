
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


};

export default actions;