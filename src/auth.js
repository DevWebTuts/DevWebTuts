import Auth0Lock from 'auth0-lock';
import {
    auth0Config
} from "../env.json";

const lock = new Auth0Lock(auth0Config.clientId, auth0Config.domain, auth0Config.options);

export default lock;