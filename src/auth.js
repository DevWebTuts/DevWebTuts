import Auth0Lock from 'auth0-lock';
let lock = new Auth0Lock(
    'RuJ0Y-QzSy2FsV6764-euAu4H11hfmQz',
    'ralphchristianeclipse.auth0.com', {
        auth: {
            responseType: 'token id_token',
            scope: 'openid email',
        },
        languageDictionary: {
            title: "DevWebTuts"
        },
    }
);

export default lock;