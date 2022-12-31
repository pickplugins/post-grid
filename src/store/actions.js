
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

    console.log('step: 2');

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
    console.log('step: 3');

    return {
      type: 'FETCH_PRO_INFO_FROM_API',
      path,
    };
  },

};

export default actions;