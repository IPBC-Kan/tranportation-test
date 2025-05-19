import { ThemeOptions } from '@mui/material';
import { grey } from '@mui/material/colors';
import { colors } from './colors';
import { breackpoints } from './breackpoints';

export const theme: ThemeOptions = {
	direction: 'rtl',
	spacing: 4,
	palette: {
		primary: {
			main: colors.white,
		},
		secondary: {
			main: colors.black,
		},
		common: {
			white: colors.white,
			black: colors.black,
		},
		text: {
			primary: colors.black,
			secondary: colors.black,
		},
		background: {
			paper: colors.white,
			default: colors.white,
		},
		info: {
			light: grey[300],
			main: colors.black,
		},
		error: {
			main: colors.black,
		},
	},
	typography: {
		fontFamily: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'].join(','),
		fontSize: 13,
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: parseFloat(breackpoints.breackpointPhone),
			md: parseFloat(breackpoints.breackpointTablets),
			lg: parseFloat(breackpoints.breackpointLaptops),
			xl: parseFloat(breackpoints.breackpointDesktop),
		},
	},
	components: {
		MuiTypography: {
			defaultProps: {
				variantMapping: {
					h1: 'h1',
					h2: 'h2',
					h3: 'h3',
					h4: 'h4',
					h5: 'h5',
					h6: 'h6',
					subtitle1: 'h2',
					subtitle2: 'h2',
					body1: 'span',
					body2: 'p',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: 13,
					fontWeight: 600,
					textTransform: 'capitalize',
				},
				contained: {
					color: colors.white,
					backgroundColor: '#b71c32',
					'&:hover': {
						backgroundColor: '#b71c32',
					},
				},
				outlined: {
					color: colors.black,
					backgroundColor: colors.transparent,
					border: '1px solid #000',
					bowShadow:
						'0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
					'&:hover': {
						border: '1px solid #000',
					},
				},
			},
		},
		MuiButtonGroup: {
			styleOverrides: {
				root: {
					background:
						' linear-gradient(349.17deg, #545454 3.04%, #3F3F3F 91.1%)',
					borderRadius: '70px',
					boxShadow: 'inset 0px 0.992047px 0.992047px rgba(255, 255, 255, 0.4)',

					button: {
						height: '45px',
						backgroundColor: colors.transparent,
						border: '0!important',
					},
					'button:first-child': {
						borderRadius: ' 0 70px 70px 0!important',
						marginLeft: '-1px',
					},
					'button:last-child': {
						borderRadius: '70px 0 0 70px!important',
					},
				},
			},
		},
		MuiSelect: {
			defaultProps: {
				disableUnderline: true,
			},
			styleOverrides: {
				select: {
					borderRadius: '10px',
					background: colors.backgroundInput,
					color: colors.textInput,
					fontSize: '14.5417px',
					fontWeight: 400,
					lineHeight: '32px',
					border: 0,
					padding: '4px!important',
					paddingRight: '11px!important',
					paddingLeft: '40px!important',
				},
				icon: {
					right: 'auto',
					left: '20px',
					color: colors.white,
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					marginTop: '0!important',
				},
				input: {
					height: '31px',
					padding: '4px 0 5px',
					borderRadius: '10px',
					background: colors.backgroundInput,
					color: colors.textInput,
					fontSize: '16.69px',
					fontWeight: 400,
					lineHeight: '32px',
					paddingRight: '11px',

					'&::placeholder': {
						color: grey[300],
						fontSize: 13,
						fontWeight: 400,
						opacity: 1,
					},
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					bottom: 0,
					borderBottom: `1px solid ${colors.labelInput}`,
				},
			},
		},
		MuiListItemText: {
			styleOverrides: {
				root: {
					textAlign: 'initial',
				},
				primary: {
					fontSize: '21px',
					color: colors.activeText,
				},
				secondary: {
					fontSize: '15px',
					color: colors.activeText,
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					minWidth: '40px',
				},
			},
		},
		MuiFormControl: {
			styleOverrides: {
				root: {
					color: 'black',
					borderRadius: 4,
					backgroundColor: 'transparent',
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: colors.labelInput,
					fontSize: '20px',
					fontWeight: 400,
					lineHeight: '125%',
					position: 'static',
					transform: 'none',
					marginBottom: '12px',
					border: 0,

					'&:hover': {
						color: colors.labelInput,
					},
					'&.Mui-focused': {
						color: colors.labelInput,
					},
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					textAlign: 'initial',
					marginTop: '0px',
					fontSize: '20px',
					fontWeight: 400,
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					color: colors.black,
					fontFamily: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'].join(
						','
					),
					fontSize: 13,
					fontWeight: 500,
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					minHeight: '25px!important',
					color: colors.textInput,
				},
			},
		},
		MuiTable: {
			styleOverrides: {
				root: {
					borderTop: `3px solid ${colors.gray}`,
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderBottom: `1px solid ${colors.gray}`,
					padding: '15px',
				},
				head: {
					fontWeight: 700,
				},
			},
		},
		MuiTableSortLabel: {
			styleOverrides: {
				root: {
					color: `${colors.black}!important`,
					'&:hover': {
						color: `${colors.black}!important`,
					},
				},
				icon: {
					color: `${colors.black}!important`,
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					cursor: 'pointer',
					'&:hover': {
						backgroundColor: 'rgba(242, 243, 246, 0.5) !important',
					},

					'&.Mui-selected': {
						backgroundColor: colors.grayLight,
					},
				},
				head: {
					'&:hover': {
						backgroundColor: `${colors.white}!important`,
					},
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					height: '45px',
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: colors.black,
					'&.Mui-checked': {
						color: colors.black,
					},
					padding: 0,
				},
			},
		},
		MuiPagination: {
			styleOverrides: {
				root: {
					display: 'flex',
					justifyContent: 'flex-end',
					marginTop: 10,
				},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				asterisk: {
					color: colors.black,
					'&$error': {
						color: colors.black,
					},
					fontSize: 16,
				},
			},
		},
		MuiAccordion: {
			styleOverrides: {
				root: ({ theme: themeParam }) => ({
					margin: '28px 0!important',

					'&.Mui-expanded': {
						margin: '52px 0!important',
						[themeParam.breakpoints.down('lg')]: {
							margin: '28px 0!important',
						},
					},

					'&::before': {
						display: 'none',
					},
				}),
			},
		},
		MuiAccordionDetails: {
			styleOverrides: {
				root: {
					padding: 0,
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: ({ theme: themeParam }) => ({
					[themeParam.breakpoints.down('md')]: {
						width: '100%',
					},
					maxWidth: 'inherit !important',
					maxHeight: 'inherit !important',
					margin: '0 !important',
					height: '100%',
					display: 'flex',
					textAlign: 'center',
					flexDirection: 'column',
					alignContent: 'space-around',
					justifyContent: 'space-evenly',
					width: '500px',
				}),
			},
		},
	},
};
