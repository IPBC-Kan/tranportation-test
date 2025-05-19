export const isAppOnly = (accessTokenPayload: any) => {
    if (!accessTokenPayload.hasOwnProperty('idtyp')) {
        if (accessTokenPayload.hasOwnProperty('scp')) {
            return false;
        } else if (
            !accessTokenPayload.hasOwnProperty('scp') &&
            accessTokenPayload.hasOwnProperty('roles')
        )
            return true;
    }
    return (accessTokenPayload.idtyp = 'app');
};

export const hasRequiredDelegatedPermissions = (
    accessTokenPayload: any,
    requiredPermission: any[]
) => {
    const normalizedRequiredPermissions = requiredPermission.map(permission =>
        permission.toUpperCase()
    );

    if (
        accessTokenPayload.hasOwnProperty('scp') &&
        accessTokenPayload.scp
            .split(' ')
            .some((claim: string) =>
                normalizedRequiredPermissions.includes(claim.toUpperCase())
            )
    ) {
        return true;
    }

    return false;
};
