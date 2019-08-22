const UTIL = {
    buildQueryString: function(obj) {
        return Object.keys(obj).reduce(function(str, key, index) {
            if (!str) {
                str += '?' + key + '=' + obj[key];
            } else {
                str += '&' + key + '=' + obj[key];
            }
            return str;
        }, '');
    }

    // This function given a wkt polygon string,
    // returns an array of latlngs.
};

export default UTIL;
