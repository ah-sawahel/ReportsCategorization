import { Button } from '@material-ui/core';
import { useState } from 'react';
import { getAllReports, getBlockedCount, getResolvedReports, reloadDatabaseCall } from '../api/reports';
import { Report } from '../models/report';
import ReportCard from './reportCard';

const ReportView = () => {
	const [reports, setReports] = useState<Report[] | undefined>(undefined);
	const [resolvedReports, setResolvedReports] = useState<Report[] | undefined>(undefined);
	const [blockedCount, setBlockedCount] = useState<number>(0);

	const updateReports = () => {
		getAllReports().then((r) => setReports(r));
		getResolvedReports().then((r) => setResolvedReports(r));
		getBlockedCount().then((b) => setBlockedCount(b));
	};
	const reloadDatabase = () => {
		reloadDatabaseCall(updateReports);
	};

	if (!reports) updateReports();

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
				<h4>Blocked Reports: {blockedCount}</h4>
				<Button variant='contained' color='primary' onClick={() => reloadDatabase()}>
					Reload Database
				</Button>
			</div>
			{reports && reports.map((r: Report) => <ReportCard key={r._id} report={r} updateReports={updateReports} />)}
			{resolvedReports && resolvedReports.map((r: Report) => <ReportCard key={r._id} report={r} updateReports={updateReports} />)}
		</div>
	);
};

export default ReportView;
