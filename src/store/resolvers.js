
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

        //console.log(res);


        return actions.setproinfo(res);
    },



}

export default resolvers;