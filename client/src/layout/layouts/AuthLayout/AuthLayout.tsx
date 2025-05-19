import { Box } from '@mui/material';
import { Outlet } from 'react-router';
/* import styles from './authLayout.module.scss'; */

export const AuthLayout = () => {
	return (
		<Box sx={{ display: 'flex' }}>
			<Box
				sx={{
					width: '100%',
					height: 'calc(100vh - 50px)',
					p: { xs: 2, sm: 3 },
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: '#f7f7f7',
				}}
			>
				<Box
					sx={{
						width: '420px',
						height: '440px',
						padding: '30px',
						display: 'flex',
						flexDirection: 'column',
						boxShadow: 'rgb(0 0 0 / 15%) 0px 2px 8px',
						border: 'none',
						borderRadius: '8px',
						background: 'white',
					}}
				>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};
