import React from 'react';
import { Button, Container, Flex, Text } from '@chakra-ui/react';

const Pagination = ({
	totalPages,
	currentPageNumber,
	setCurrentPageNumber,
	onChangePage,
}) => {
	let pagesToDisplay = [];

	const handlePageChange = (nextPage) => {
		setCurrentPageNumber(nextPage);
		onChangePage(nextPage);
	};

	if (currentPageNumber === 1) {
		pagesToDisplay = [currentPageNumber];
		let nextPage = currentPageNumber + 1;

		while (nextPage <= totalPages && pagesToDisplay.length < 3) {
			pagesToDisplay.push(nextPage);
			nextPage += 1;
		}
	} else if (currentPageNumber > 1 && currentPageNumber < totalPages) {
		pagesToDisplay = [currentPageNumber - 1];
		let nextPage = currentPageNumber;

		while (nextPage <= totalPages && pagesToDisplay.length < 3) {
			pagesToDisplay.push(nextPage);
			nextPage += 1;
		}
	} else {
		pagesToDisplay = [currentPageNumber];
		let nextPage = currentPageNumber - 1;

		while (
			pagesToDisplay.length < totalPages &&
			nextPage >= 1 &&
			pagesToDisplay.length < 3
		) {
			pagesToDisplay.unshift(nextPage);
			nextPage -= 1;
		}
	}

	if (!totalPages || !(totalPages > 0)) {
		return null;
	}

	return (
		<Container centerContent>
			<Flex mr='-5px'>
				{pagesToDisplay[0] !== 1 && (
					<Button
						mr='5px'
						variant='outline'
						colorScheme='green'
						onClick={() => handlePageChange(currentPageNumber - 1)}
					>
						<Text>{'<'}</Text>
					</Button>
				)}

				{pagesToDisplay.map((pageNo) => (
					<Button
						mr='5px'
						key={pageNo + Math.random()}
						colorScheme='green'
						variant={pageNo === currentPageNumber ? 'solid' : 'outline'}
						onClick={() => handlePageChange(pageNo)}
					>
						<Text>{pageNo}</Text>
					</Button>
				))}

				{pagesToDisplay[pagesToDisplay.length - 1] !== totalPages && (
					<Button
						mr='5px'
						variant='outline'
						colorScheme='green'
						onClick={() => handlePageChange(currentPageNumber + 1)}
					>
						<Text>{'>'}</Text>
					</Button>
				)}
			</Flex>
		</Container>
	);
};

export default Pagination;
