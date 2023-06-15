import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
	totalPages: number,
	page: number,
};

const PaginationButtons = (props: Props) => {
	let navigate = useNavigate();

	const [currentPage, setCurrentPage] = useState(props.page);

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
			navigate(`/shelf?page=${currentPage -1}`);
		}
	};

	const handleNextPage = () => {
		if (currentPage < props.totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
			navigate(`/shelf?page=${currentPage +1}`);
		}
	};

	const handleGoToPage = (page: number) => {
		if (page >= 1 && page <= props.totalPages) {
			setCurrentPage(page);
			navigate(`/shelf?page=${page}`);
		}
	};

	const renderPageNumbers = () => {
		const pageNumbersToShow = 2;
		const pageNumbers = [];

		for (
			let i = currentPage - pageNumbersToShow;
			i <= currentPage + pageNumbersToShow;
			i++
		) {
			if (i >= 1 && i <= props.totalPages) {
				pageNumbers.push(i);
			}
		}

		return pageNumbers.map((pageNumber) => (
			<Button
				key={pageNumber}
				variant="outlined"
				sx={{ marginX: 1 }}
				disabled={pageNumber === currentPage}
				onClick={() => handleGoToPage(pageNumber)}
			>
				{pageNumber}
			</Button>
		));
	};
	return (
		<>
			{/* Pagination Controls */}
			<Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
				<Button
					variant="contained"
					disabled={currentPage === 1}
					onClick={handlePreviousPage}
				>
					Previous
				</Button>
				<Typography variant="body1" sx={{ marginX: 2 }}>
					Page {currentPage}
				</Typography>
				<Button
					variant="contained"
					disabled={currentPage === props.totalPages}
					onClick={handleNextPage}
				>
					Next
				</Button>
			</Box>

			{/* Page Numbers */}
			<Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
				{renderPageNumbers()}
			</Box>
		</>
	);
};

export default PaginationButtons;
