import { Box, Button, Typography } from "@mui/material";
import React, { useState } from 'react'

type Props = {}

const PaginationButtons = (props: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
	const totalPages = 10;

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	const handleGoToPage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const renderPageNumbers = () => {
		const pageNumbersToShow = 2;
		const pageNumbers = [];

		for (let i = currentPage - pageNumbersToShow; i <= currentPage + pageNumbersToShow; i++) {
			if (i >= 1 && i <= totalPages) {
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
					<Button variant="contained" disabled={currentPage === 1} onClick={handlePreviousPage}>
						Previous
					</Button>
					<Typography variant="body1" sx={{ marginX: 2 }}>
						Page {currentPage}
					</Typography>
					<Button variant="contained" disabled={currentPage === totalPages} onClick={handleNextPage}>
						Next
					</Button>
				</Box>

				{/* Page Numbers */}
				<Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
					{renderPageNumbers()}
				</Box>
    </>
  )

}

export default PaginationButtons