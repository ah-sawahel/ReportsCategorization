import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReportView from './components/reportsView';

export default function App() {
	return (
		<Container maxWidth='md'>
			<Box my={4}>
				<Typography variant='h4' component='h1' gutterBottom>
					This is Ahmed Sawahel's test project..
				</Typography>
				<ReportView />
			</Box>
		</Container>
	);
}
