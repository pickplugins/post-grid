
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
        return proinfo;
    },
    getLicense(state) {
        const { license } = state;
        return license;
    },

};

export default selectors;