import React from 'react';
import {
	Box,
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

import Filter from './Filter';

const TableFilterMenu = ({
	filterOptionsRef,
	stickyFilter,
	handleSearchChange,
	searchInputRef,
	possibleFilters,
	activeFilters,
	handleApplyNewFilters,
}) => {
	const handleSearchSubmit = (event) => {
		event.preventDefault();
		handleSearchChange(event.target.searchRecords.value);
	};

	return (
		<Flex
			position='sticky'
			top='-1'
			w='100%'
			bg='white'
			px='5'
			pt='4'
			pb='3'
			my='3'
			ref={filterOptionsRef}
			borderBottom={stickyFilter ? '1px' : ''}
			borderColor='gray.200'
			boxShadow={stickyFilter ? 'sm' : ''}
			flexWrap='wrap'
		>
			<Box
				as='form'
				mr={['5px', '20px']}
				mb='10px'
				onSubmit={handleSearchSubmit}
			>
				<InputGroup maxW='300px'>
					<InputLeftElement pointerEvents='none'>
						<Search2Icon />
					</InputLeftElement>
					<Input
						w='100%'
						placeholder='search by name'
						ref={searchInputRef}
						name='searchRecords'
					/>
				</InputGroup>
			</Box>
			<Filter
				possibleFilters={possibleFilters}
				activeFilters={activeFilters}
				handleApplyFiters={handleApplyNewFilters}
			/>
		</Flex>
	);
};

export default TableFilterMenu;
