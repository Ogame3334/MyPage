"use strict";
const param = window.location.search;
if (!/\?anim=false/.exec(param)) {
    const sessionKey = 'anim';
    const sessionValue = 'true';
    //sessionStorageにsessionKeyというデータの有無を判別
    if (sessionStorage.getItem(sessionKey) != sessionValue) {
        //sessionStorageにデータを追加
        sessionStorage.setItem(sessionKey, sessionValue);
    }
}
