const API_URL = 'http://laravel9-vuex.test';

export default class {

    static getUrl(route) {
        return API_URL + '/' + route;
    }

}
