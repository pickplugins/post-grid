
var selectors = {

    getBreakPoint(state) {
        const { breakPoint } = state;
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

};

export default selectors;