import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import '../App.scss'
import '../styles/abstracts/_colours.scss';
import '../styles/abstracts/_fonts.scss';
import '../styles/abstracts/index.scss'
import Sidebar from '../components/Layout/Sidebar';

export default function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
			<div style={{display:'flex', height:'100vh', width:'100%'}}>
				<Sidebar/>
				<div>
					<Outlet/>
				</div>
				
			</div>
		</MantineProvider>
	)
}