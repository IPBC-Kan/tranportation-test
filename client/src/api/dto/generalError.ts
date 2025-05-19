export enum AppErrorCode {
    Authentication_InvalidToken = 100,
    Authentication_AuthenticationFailed = 101,

    User_PasswordSecretExpired = 400,
    User_PasswordSecretWrong = 401,

    General_ItemDoesNotExist = 900,
    General_ParamIsMissing = 901,
    General_UnknownError = 999
}

export interface GeneralError {
    errorCode: AppErrorCode;

    description: string;
}
