// Раздел: Основные типы, урок: Упражнение - Типизируем функцию
enum QuestionStatus {
	PUBLISHED = "published",
	DRAFT = "draft",
	DELETED = "deleted",
}

type TMethod = 'POST' | 'GET' | 'PATCH' | 'DELETE';

interface IRequest {
	method: TMethod,
	body: string;
}

interface IResponse {
	question: string,
	answer: string,
	tags: string[];
	likes: number;
	status: QuestionStatus;
}



async function getFaqs(req: { topicId: number; status: QuestionStatus }): Promise<IResponse> {
	const reqParams: IRequest = {
		method: 'POST',
		body: JSON.stringify(req)
	}
	const res = await fetch('/faqs', reqParams);
	const data = await res.json();
	return data as IResponse;
}
