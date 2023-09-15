// Домашнее задание - Продвинутые типы

import axios from 'axios';
import { API_DUMMYJSON_URL, USER_ERROR } from './constants';

function isResHasUsers(res: IRes): res is IRes {
	// prettier-ignore
	return !!res && 'data' in res
		&& 'users' in res.data && Array.isArray(res.data.users)
		&& 'total' in res.data
		&& 'skip' in res.data
		&& 'limit' in res.data
		;
}

async function getUsers(): Promise<IResData> {
	try {
		const res = await axios.get(API_DUMMYJSON_URL.USERS);
		if (isResHasUsers(res)) {
			res.data.total = +res.data.total;
			res.data.skip = +res.data.skip;
			res.data.limit = +res.data.limit;
			return res.data;
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
		}
	}
	throw new Error(USER_ERROR.BAD_REQUEST);
}

(async function () {
	const { users, total, skip, limit }: IResData = await getUsers();
	console.log({ users, total, skip, limit });
})();
