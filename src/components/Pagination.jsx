'use client';

import { usePagination } from '@/hooks/usePagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * The `Pagination` component is a React component that renders a pagination UI with previous and next
 * buttons, page numbers, and ellipsis for large page counts.
 * @returns The Pagination component is returning a JSX element, specifically a `<ul>` element with a
 * list of `<li>` elements representing the pagination navigation.
 */
const Pagination = (props) => {
	const { totalPageCount, siblingCount = 1, currentPage, onPageChange } = props;

	const paginationRange = usePagination({
		currentPage,
		totalPageCount,
		siblingCount,
	});

	// If there are less than 2 times in pagination range we shall not render the component
	if (currentPage === 0 || paginationRange?.length < 2) {
		return null;
	}

	const onNext = () => {
		if (currentPage < totalPageCount) onPageChange(currentPage + 1);
	};
	const onPrevious = () => {
		if (currentPage > 1) onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange?.length - 1];

	return (
		<ul className="flex list-none items-center justify-between w-fit gap-2 m-auto bg-white dark:bg-[#020817]  shadow-md rounded-md px-2 py-2 border border-gray-200 dark:border-gray-200/20">
			{/* Left navigation arrow */}
			<li
				onClick={onPrevious}
				className={`flex justify-center items-center h-[40px] w-[40px] ${
					currentPage === 1
						? 'hover:bg-transparent hover:cursor-default'
						: 'flex justify-center items-center h-[40px] w-[40px] text-black rounded-md text-xs hover:cursor-pointer hover:bg-[#7E8EFF]/50'
				}`}
			>
				<ChevronLeft
					className={
						currentPage === 1 ? 'text-gray-500' : 'text-black dark:text-white'
					}
				/>
			</li>

			{paginationRange.map((pageNumber) => {
				// If the pageItem is a DOT, render the DOTS unicode character
				if (pageNumber === '...') {
					return (
						<li
							className="w-fit py-0 px-1 h-8 text-center mx-auto my-1 text-black flex items-center rounded-xl text-xs  bg-transparent"
							key={pageNumber}
						>
							&#8230;
						</li>
					);
				}

				// Render our Page Pills
				return (
					<li
						onClick={() => onPageChange(Number(pageNumber))}
						className={`flex justify-center items-center h-[40px] w-[40px]  text-black dark:text-white rounded-md text-sm hover:cursor-pointer  ${
							pageNumber === currentPage
								? 'bg-[#7E8EFF]/50 '
								: 'hover:bg-[#7E8EFF]/50'
						}`}
						key={pageNumber}
					>
						{pageNumber}
					</li>
				);
			})}

			{/*  Right Navigation arrow */}
			<li
				onClick={onNext}
				className={`flex justify-center items-center h-[40px] w-[40px] ${
					currentPage === lastPage
						? ' hover:bg-transparent hover:cursor-default'
						: 'flex justify-center items-center h-[40px] w-[40px] text-center mx-auto text-black rounded-md text-xs hover:cursor-pointer hover:bg-[#7E8EFF]/50'
				}`}
			>
				<ChevronRight
					className={
						currentPage === lastPage
							? 'text-gray-500'
							: 'text-black dark:text-white'
					}
				/>
			</li>
		</ul>
	);
};

export default Pagination;
