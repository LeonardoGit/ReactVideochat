"use strict";

import { LOGIN_USER, LOGOUT_USER } from "../constants/LoginConstants";
import BaseStore from "./BaseStore";

class LoginStore extends BaseStore {
    constructor() {
        super(this._registerToActions.bind(this));
        this._token = null;
    }

    _registerToActions(action) {
        switch (action.actionType) {

            case LOGIN_USER:
                this._token = action.token;
                this.emitChange();
                break;

            case LOGOUT_USER:
                this._token = null;
                this.emitChange();
                break;

            default:
                break;
        }
    }

    get user() {
        return this._token;
    }

    isLoggedIn() {
        return !!this._token;
    }
}

export default new LoginStore();