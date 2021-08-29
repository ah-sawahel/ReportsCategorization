import React, { FC } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Report } from '../models/report';
import { BlockReport, ResolveReport } from '../api/reports';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: 'aquamarine',
			width: '100%',
			marginBottom: '2rem',
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
		},
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
		icon: {
			verticalAlign: 'bottom',
			height: 20,
			width: 20,
		},
		details: {
			alignItems: 'center',
		},
		column: {
			flexBasis: '33.33%',
		},
		helper: {
			borderLeft: `2px solid ${theme.palette.divider}`,
			padding: theme.spacing(1, 2),
		},
		link: {
			color: theme.palette.primary.main,
			textDecoration: 'none',
			'&:hover': {
				textDecoration: 'underline',
			},
		},
	})
);

interface ReportCardProps {
	report: Report;
	updateReports?: Function;
}

const ReportCard: FC<ReportCardProps> = ({ report, updateReports: refreshReports }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Accordion defaultExpanded style={{ backgroundColor: report.state === 'CLOSED' ? 'aquamarine' : 'whitesmoke' }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1c-content' id='panel1c-header'>
					<div className={classes.column}>
						<Typography className={classes.heading}>{report.source}</Typography>
					</div>
					<div className={classes.column}>
						<Typography className={classes.heading}>{report.payload.reportType}</Typography>
					</div>
					<div className={classes.column}>
						<Typography className={classes.secondaryHeading}>{report.state}</Typography>
					</div>
				</AccordionSummary>
				<AccordionDetails className={classes.details}>
					<div className={classes.column} />
					<div className={clsx(classes.column, classes.helper)}>
						<Typography variant='caption'>
							{report.id}
							<br />
							{report.payload.message}
							<br />
							<a href='' className={classes.link}>
								Details
							</a>
						</Typography>
					</div>
				</AccordionDetails>
				<Divider />
				{report.state === 'OPEN' && (
					<AccordionActions>
						<Button size='small' onClick={() => BlockReport(report._id, refreshReports)}>
							BLOCK
						</Button>
						<Button size='small' onClick={() => ResolveReport(report._id, refreshReports)} color='primary'>
							RESOLVE
						</Button>
					</AccordionActions>
				)}
			</Accordion>
		</div>
	);
};

export default ReportCard;
