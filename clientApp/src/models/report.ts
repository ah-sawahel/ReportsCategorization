export interface Reference {
	referenceId: string;
	referenceType: string;
}

export interface Payload {
	source: string;
	reportType: string;
	message: string;
	reportId: string;
	referenceResourceId: string;
	referenceResourceType: string;
}

export interface Report {
	_id: string;
	id: string;
	source: string;
	sourceIdentityId: string;
	reference: Reference;
	state: string;
	payload: Payload;
	created: Date;
}
