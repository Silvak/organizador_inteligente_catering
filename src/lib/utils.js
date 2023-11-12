import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function getImgSrc(type = 'user', imageName) {
	return `${process.env.NEXT_PUBLIC_BASE_URL}/files/${type}/${imageName}`;
}
