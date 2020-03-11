// const websiteUrl = 'http://192.168.31.98:7001';
const websiteUrl = 'http://localhost:7001';
const now = Date.now || function () {
    return new Date().getTime();
};
const isArray = Array.isArray || function (obj) {
    return obj instanceof Array;
};

export default {
    websiteUrl,
    now,
    isArray
}