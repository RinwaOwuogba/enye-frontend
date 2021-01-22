import React, { useEffect, useRef, useState } from 'react';
import {
	Box,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

import RecordTable from './components/RecordTable';
import Filter from './components/Filter';
import Pagination from './components/Pagination';

import apiResponse from './records.json';
import './App.css';

const constants = {
	RECORDS_PER_PAGE: 20,
};

const App = () => {
	const filterOptionsRef = useRef(null);

	const [totalRecords, setTotalRecords] = useState([]);
	const [filteredProfiles, setFilteredProfiles] = useState([]);
	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	const [currentProfiles, setCurrentProfiles] = useState([]);

	const [activeFilters, setActiveFilters] = useState([]);
	const [possibleFilters, setPossibleFilters] = useState([]);

	const [stickyFilter, setFilterSticker] = useState(false);

	const tableHeaders = ['First Name', 'Last Name', 'Email', 'Payment Method'];
	const recordProperties = ['FirstName', 'LastName', 'Email', 'PaymentMethod'];

	// handle disappearing shadow on filter options
	useEffect(() => {
		const intialFilterOptionsRef = filterOptionsRef.current;
		const observer = new IntersectionObserver(
			([element]) => {
				if (element.intersectionRatio < 1 && !stickyFilter) {
					setFilterSticker(true);
				}

				if (element.intersectionRatio >= 1 && stickyFilter) {
					setFilterSticker(false);
				}
			},
			{
				threshold: [1],
			}
		);

		observer.observe(intialFilterOptionsRef);

		return () => {
			observer.unobserve(intialFilterOptionsRef);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stickyFilter, setFilterSticker]);

	// fetch records from api and paginate response
	useEffect(() => {
		// set possible filters based on available options
		const genderOptions = new Set(
			apiResponse.records.profiles.map((profile) => profile.Gender)
		);
		const paymentMethodOptions = new Set(
			apiResponse.records.profiles.map((profile) => profile.PaymentMethod)
		);

		const filters = [
			{
				title: 'Gender',
				keyName: 'Gender',
				options: [...genderOptions],
			},
			{
				title: 'Payment method',
				keyName: 'PaymentMethod',
				options: [...paymentMethodOptions],
			},
		];
		setPossibleFilters(filters);

		// set profiles
		setTotalRecords(apiResponse.records.profiles);
		setFilteredProfiles(apiResponse.records.profiles);
		setCurrentProfiles(
			apiResponse.records.profiles.slice(0, constants.RECORDS_PER_PAGE)
		);
	}, []);

	const filterProfiles = (filters, profiles) => {
		if (!filters.length) {
			return profiles;
		}

		const validProfiles = profiles.filter((profile) => {
			let isMatch = false;

			// check if profile property value matches any active
			// filter options
			filters.some((filter) => {
				if (filter.options.includes(profile[filter.keyName])) {
					isMatch = true;
					return true;
				}

				return false;
			});

			return isMatch;
		});

		return validProfiles;
	};

	const handleSearchChange = (event) => {
		const searchText = event.target.value;

		let newFilteredProfiles = totalRecords.filter(
			(profile) =>
				String(profile.FirstName)
					.toLocaleLowerCase()
					.includes(searchText.toLocaleLowerCase()) ||
				String(profile.LastName)
					.toLocaleLowerCase()
					.includes(searchText.toLocaleLowerCase())
		);

		newFilteredProfiles = filterProfiles(activeFilters, newFilteredProfiles);

		const startIndexOfNextPage = constants.RECORDS_PER_PAGE * 0;
		const endIndexOfNextPage = startIndexOfNextPage + 20;

		setFilteredProfiles(newFilteredProfiles);

		setCurrentPageNumber(1);
		setCurrentProfiles(
			filteredProfiles.slice(startIndexOfNextPage, endIndexOfNextPage)
		);
	};

	const handleApplyFilters = (newFilters) => {
		const newFilteredProfiles = filterProfiles(newFilters, filteredProfiles);

		setActiveFilters(newFilters);
		setFilteredProfiles(newFilteredProfiles);

		const startIndexOfNextPage = constants.RECORDS_PER_PAGE * 0;
		const endIndexOfNextPage = startIndexOfNextPage + 20;

		setCurrentPageNumber(1);
		setCurrentProfiles(newFilteredProfiles.slice(0, endIndexOfNextPage));
	};

	const onChangePage = (pageNo) => {
		const startIndexOfNextPage = constants.RECORDS_PER_PAGE * (pageNo - 1);
		const endIndexOfNextPage = startIndexOfNextPage + 20;

		setCurrentPageNumber(pageNo);
		setCurrentProfiles(
			filteredProfiles.slice(startIndexOfNextPage, endIndexOfNextPage)
		);

		window.scrollTo({
			top: true,
		});
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<Heading
					mt='5'
					fontSize={{ base: '1.5rem', md: '1.7rem', lg: '2rem ' }}
				>
					Transax
				</Heading>
			</header>

			<Text mt='2' px='5'>
				Here's an overview of some of our users and some information about their
				recent transactions
			</Text>

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
				<InputGroup maxW='300px' mr={['5px', '20px']} mb='10px'>
					<InputLeftElement pointerEvents='none'>
						<Search2Icon />
					</InputLeftElement>
					<Input
						w='100%'
						onChange={handleSearchChange}
						placeholder='search by name'
					/>
				</InputGroup>
				<Filter
					possibleFilters={possibleFilters}
					activeFilters={activeFilters}
					handleApplyFiters={handleApplyFilters}
				/>
			</Flex>

			<Box mt='5' px='5'>
				<Flex justify='space-between' my='3' color='gray.500' wrap='wrap'>
					<Text mb='2'>Showing 1-20 records per page</Text>
					<Text mb='2'>{`${totalRecords.length} user records / Page ${currentPageNumber}`}</Text>
				</Flex>

				<Box overflowX='auto'>
					<RecordTable
						users={currentProfiles}
						headers={tableHeaders}
						properties={recordProperties}
					/>
				</Box>

				<Box my='5'>
					<Pagination
						totalPages={Math.ceil(
							filteredProfiles.length / constants.RECORDS_PER_PAGE
						)}
						onChangePage={onChangePage}
						currentPageNumber={currentPageNumber}
						setCurrentPageNumber={setCurrentPageNumber}
					/>
				</Box>
			</Box>
		</div>
	);
};

export default App;
