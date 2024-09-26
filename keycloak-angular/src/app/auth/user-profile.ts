export interface UserProfile {
  id?: string;
	username?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	enabled?: boolean;
	emailVerified?: boolean;
	totp?: boolean;
	createdTimestamp?: number;
	attributes?: Record<string, unknown>;
  token: string;
  roles: string[];
  profilePicture?: string;
}
