import Auth0Lock from 'auth0-lock';

let clientId = "RuJ0Y-QzSy2FsV6764-euAu4H11hfmQz";
let domain = "ralphchristianeclipse.auth0.com";
let options = {
    auth: {
        autoParseHash: true,
        responseType: "token",
        sso: true
    }
};

const lock = new Auth0Lock(clientId, domain, options);

export default lock;