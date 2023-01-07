import apiFetch from '@wordpress/api-fetch';
import { createReduxStore, register, subscribe, select } from '@wordpress/data';






const DEFAULT_STATE = {
  breakPoint: 'Desktop',
  clientdata: {},
  proinfo: { proInstalled: false, status: 'inactive-initial' },
  license: { license_status: '', license_key: '' },
  blockCss: '',

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
    //console.log('step: 1');

    const { proinfo } = state;

    //console.log(proinfo);

    return proinfo;
  },
  getLicense(state) {
    const { license } = state;
    return license;
  },

  generateBlockCss(state, items, blockId, customCss) {
    const { blockCss } = state;


    //console.log(items);


    var reponsiveCssGroups = {};


    for (var selector in items) {



      var attrs = items[selector];


      for (var attr in attrs) {
        var breakpoints = attrs[attr];

        for (var device in breakpoints) {

          var attrValue = breakpoints[device];

          if (reponsiveCssGroups[device] == undefined) {
            reponsiveCssGroups[device] = []
          }

          if (reponsiveCssGroups[device] == undefined) {
            reponsiveCssGroups[device] = []
          }

          if (reponsiveCssGroups[device][selector] == undefined) {
            reponsiveCssGroups[device][selector] = []
          }

          reponsiveCssGroups[device][selector].push({ 'attr': attr, 'val': attrValue });

        }
      }
    }



    //return false;
    var reponsiveCssDesktop = '';


    if (reponsiveCssGroups['Desktop'] != undefined) {
      //reponsiveCssDesktop += '@media only screen and (min-width: 781px){';

      for (var selector in reponsiveCssGroups['Desktop']) {
        var attrs = reponsiveCssGroups['Desktop'][selector];

        reponsiveCssDesktop += selector + '{';
        for (var index in attrs) {
          var attr = attrs[index]
          var attrName = attr.attr;
          var attrValue = attr.val;
          reponsiveCssDesktop += attrName + ':' + attrValue + ';';
        }
        reponsiveCssDesktop += '}';


      }
      //reponsiveCssDesktop += '}';
    }




    var reponsiveCssTablet = '';

    if (reponsiveCssGroups['Tablet'] != undefined) {
      //reponsiveCssTablet += '@media only screen and (min-width: 361px) and (max-width: 780px){';
      reponsiveCssTablet += '@media(max-width: 780px){';

      for (var selector in reponsiveCssGroups['Tablet']) {
        var attrs = reponsiveCssGroups['Tablet'][selector];

        reponsiveCssTablet += selector + '{';
        for (var index in attrs) {
          var attr = attrs[index]
          var attrName = attr.attr;
          var attrValue = attr.val;
          reponsiveCssTablet += attrName + ':' + attrValue + ';';
        }
        reponsiveCssTablet += '}';
      }

      reponsiveCssTablet += '}';
    }



    var reponsiveCssMobile = '';

    if (reponsiveCssGroups['Mobile'] != undefined) {

      //reponsiveCssMobile += '@media only screen and (min-width: 0px) and (max-width: 360px){';
      reponsiveCssMobile += '@media(max-width:360px){';

      for (var selector in reponsiveCssGroups['Mobile']) {
        var attrs = reponsiveCssGroups['Mobile'][selector];

        reponsiveCssMobile += selector + '{';
        for (var index in attrs) {
          var attr = attrs[index]
          var attrName = attr.attr;
          var attrValue = attr.val;
          reponsiveCssMobile += attrName + ':' + attrValue + ';';
        }
        reponsiveCssMobile += '}';
      }
      reponsiveCssMobile += '}';

    }

    var reponsiveCss = reponsiveCssDesktop + reponsiveCssTablet + reponsiveCssMobile;



    var iframe = document.querySelectorAll('[name="editor-canvas"]')[0];

    if (iframe) {

      setTimeout(() => {
        var iframeDocument = iframe.contentDocument;
        var body = iframeDocument.body;
        var divWrap = iframeDocument.getElementById("css-block-" + blockId);

        if (divWrap != undefined) {
          iframeDocument.getElementById("css-block-" + blockId).outerHTML = "";

        }

        var divWrap = '<div id="css-block-' + blockId + '"></div>';
        body.insertAdjacentHTML('beforeend', divWrap);

        var csswrappg = iframeDocument.getElementById('css-block-' + blockId);
        var str = '<style>' + reponsiveCss + customCss + '</style>';

        csswrappg.insertAdjacentHTML('beforeend', str);
      }, 200)


    } else {



      var wpfooter = document.getElementById('wpfooter');
      var divWrap = document.getElementById("css-block-" + blockId);

      if (divWrap != undefined) {
        document.getElementById("css-block-" + blockId).outerHTML = "";
      }

      var divWrap = '<div id="css-block-' + blockId + '"></div>';
      wpfooter.insertAdjacentHTML('beforeend', divWrap);

      var csswrappg = document.getElementById('css-block-' + blockId);
      var str = '<style>' + reponsiveCss + customCss + '</style>';

      csswrappg.insertAdjacentHTML('beforeend', str);



    }






    return blockCss;
  },



};


var resolvers = {



  * getLicense() {
    const path = '/post-grid/v2/get_license';
    const res = yield actions.fetchLicense(path);
    //////console.log(res);

    return actions.setLicense(res);
  },



  * getclientdata() {
    const path = '/post-grid/v2/get_site_details';
    const res = yield actions.fetchclientdata(path);

    //////console.log(res);


    return actions.setclientdata(res);
  },


  * getproinfo() {

    //console.log('step: 2');



    const path = '/post-grid/v2/get_pro_info';
    const res = yield actions.fetchproinfo(path);

    //console.log(res);


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

    //console.log('step: 3');
    //console.log(proinfo);

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
    //console.log('step: 4');

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
    //console.log('step: 5');

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

        //console.log('step: 3');
        //console.log(action.proinfo);


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
