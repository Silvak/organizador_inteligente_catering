import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function getImgSrc(type = 'user', imageName) {
	return `${process.env.NEXT_PUBLIC_BASE_URL}/files/${type}/${imageName}`;
}

export function paginate(array, page_size, page_number) {
	// human-readable page numbers usually start with 1, so we reduce 1 in the first argument
	return array?.slice((page_number - 1) * page_size, page_number * page_size);
}

export function isExpired(date) {
	return dayjs.unix(date).diff(dayjs()) < 1;
}
