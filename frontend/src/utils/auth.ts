import { jwtDecode } from "jwt-decode"

export interface JwtPayload {
	id: string;
	fname: string;
	lname: string;
	email: string;
	exp: number;
}

export function getCurrentUser(): JwtPayload | null {
	const token = localStorage.getItem("token");
	if (!token) return null;

	try {
		const decoded = jwtDecode<JwtPayload>(token);
		return decoded;
	} catch {
		return null;
	}
}
