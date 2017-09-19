import {Injectable} from "@angular/core";


@Injectable()
export class StorageService {

    constructor() {
    }

    public get(name: string): string {
        let result: string = null;

        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = name + "=";
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, "");
            if (c.indexOf(cookieName) == 0) {
                result =  c.substring(cookieName.length, c.length);
            }
        }

        if (result === null) {
            result = sessionStorage.getItem(name);
            // console.log("loaded from session storage: ", result);
        } else {
            // console.log("loaded from cookie: ", result);
        }

        sessionStorage.setItem(name, result);

        return result;
    }


    public delete(name: string): void {

        // let ca: Array<string> = document.cookie.split(';');
        // for (let i: number = 0; i < ca.length; i++) {
        //     let cookie:string = ca[i].replace(/^\s+/g, "");
        //     if (cookie.indexOf(name) != -1) {
        //         console.log("during delete found cookie: ", cookie);
        //     }
        // }


        this.set(name, "", -1, "/");
        sessionStorage.removeItem(name);

        // ca = document.cookie.split(';');
        // for (let i: number = 0; i < ca.length; i++) {
        //     let cookie:string = ca[i].replace(/^\s+/g, "");
        //     if (cookie.indexOf(name) != -1) {
        //         console.log("after delete found cookie: ", cookie);
        //     }
        // }

    }


    public set(name: string, value: string, expireDays: number = 1, path: string = "", setCookie: boolean = false):void  {
        if (setCookie) {
            let d: Date = new Date();
            d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
            let expires: string = "expires=" + d.toUTCString();
            let cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");

            console.log("setting cookie: ", cookie);
            document.cookie = cookie;
            console.log("document.cookie is now: ", document.cookie);
        }

        sessionStorage.setItem(name, value);
    }

}
