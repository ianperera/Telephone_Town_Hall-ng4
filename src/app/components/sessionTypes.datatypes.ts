export class User {
    id: number;
    customerId: number;
    firstName: string;
    lastName: string;
    fullname: string;
    login: string;
    loginAlt: string;
    email: string;
    password: string;
    passwordVerify: string;
    roles: Set<string>;
    phoneNumber: string;
    profilePictureURL: string;
    notifyPaymentAccepted: boolean;
    notifyFundsLevels: boolean;
    fundsCustomerOnly: boolean;
    zeroFundsNotifyBeforeMinutes: number;
    fundsNotifyLevelsDollars1: number;
    fundsNotifyLevelsDollars2: number;
    fundsNotifyLevelsDollars3: number;
    fundsNotifyLevelsDollars4: number;
    sendReceipt: boolean;
    freeTextApi: string;

}


export class SessionEvent {
    public sessionValid: boolean = false;
    public rtt: number = 0;
    public user: User = null;

}


