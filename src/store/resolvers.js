
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






}

export default resolvers;