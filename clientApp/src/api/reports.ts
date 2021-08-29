import axios from 'axios';
import { Report } from '../models/report';

const BASE_URL = 'http://localhost:3000/reports';

export const getAllReports = async (): Promise<Report[]> => {
	const result: Report[] = [];
	await axios
		.get(BASE_URL)
		.then((response) => {
			result.push(...response.data);
		})
		.catch((error) => {
			console.log(error);
		});
	return result;
};

export const getResolvedReports = async (): Promise<Report[]> => {
	const result: Report[] = [];
	await axios
		.get(BASE_URL + '/resolved')
		.then((response) => {
			result.push(...response.data);
		})
		.catch((error) => {
			console.log(error);
		});
	return result;
};

export const getBlockedCount = async (): Promise<number> => {
	let count = 0;
	await axios
		.get(BASE_URL + '/blockedReportsCount')
		.then((response) => {
			count = response.data.count;
		})
		.catch((error) => {
			console.log(error);
		});
	return count;
};

export const reloadDatabaseCall = async (callback: Function) => {
	let count = 0;
	await axios
		.put(BASE_URL)
		.then((_) => {
			callback();
		})
		.catch((error) => {
			console.log(error);
		});
};

export const BlockReport = (id: string, callback?: Function) => {
	axios
		.delete(`${BASE_URL}/${id}`)
		.then((response) => {
			callback && callback();
		})
		.catch((error) => {
			console.log(error);
		});
};

export const ResolveReport = (id: string, callback?: Function) => {
	axios
		.put(`${BASE_URL}/${id}`)
		.then((response) => {
			callback && callback();
		})
		.catch((error) => {
			console.log(error);
		});
};
