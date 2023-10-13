interface UserData {
    hash?: string,
    username?: string,
    root?: string,
    verified: boolean,
}

interface AppData {
    user: UserData,
    reference?: string,
    uploads?: any;
}

export type { UserData, AppData };