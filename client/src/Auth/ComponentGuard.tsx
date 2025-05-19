import { InteractionType } from '@azure/msal-browser';
import { useMsal, MsalAuthenticationTemplate } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { loginRequest } from './authConfig';
import { Box, Paper } from '@mui/material';

export const ComponentGuard = ({ ...props }) => {
    const { instance } = useMsal();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const activeAccount = instance.getActiveAccount() || instance.getAllAccounts()[0];

        if (!activeAccount?.idTokenClaims?.groups) return;

        //Later, group-based access control should be implemented

        // const userGroups: String[] = activeAccount.idTokenClaims.groups as String[];
        // const hasRequiredGroups = props.requriedGroups.some((group: any) => userGroups.includes(group));
        const hasRequiredGroups = true;
        setIsAuthorized(hasRequiredGroups);
    }, [instance, props]);

    return (
        <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} authenticationRequest={loginRequest}>
            {
                // eslint-disable-next-line react/jsx-no-useless-fragment
                isAuthorized ? (
                    <div>{props.children}</div>
                ) : (
                    <Paper
                        style={{
                            padding: '20px',
                            height: '50vh',
                            width: 'auto',
                        }}
                    >
                        <Box sx={{ direction: 'rtl', textAlign: '-webkit-center' }}>
                            <h1 style={{ color: 'red' }}>נראה כי אין לך הרשאות להשתמש במערכת.</h1>
                            <h4>נא בקש ממנהל המערכת להוסיפך לקבוצת הרשאות</h4>
                        </Box>
                    </Paper>
                )
            }
        </MsalAuthenticationTemplate>
    );
};
