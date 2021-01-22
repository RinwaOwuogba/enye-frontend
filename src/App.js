import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import RecordTable from './components/RecordTable';
import Pagination from './components/Pagination';
import TableFilterMenu from './components/TableFilterMenu';

import apiResponse from './records.json';

import './App.css';
import ProfileDetails from './components/ProfileDetails';

const constants = {
	RECORDS_PER_PAGE: 20,
};

const App = () => {
	const filterOptionsRef = useRef(null);
	const searchInputRef = useRef(null);

	const [totalRecords, setTotalRecords] = useState([]);
	const [filteredProfiles, setFilteredProfiles] = useState([]);
	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	const [currentProfiles, setCurrentProfiles] = useState([]);

	const [activeFilters, setActiveFilters] = useState([]);
	const [possibleFilters, setPossibleFilters] = useState([]);
	const [stickyFilter, setStickyFilter] = useState(false);

	const [selectedProfile, setSelectedProfile] = useState(null);

	const tableHeaders = [
		'First Name',
		'Last Name',
		'Gender',
		'Email',
		'Payment Method',
	];
	const recordProperties = [
		'FirstName',
		'LastName',
		'Gender',
		'Email',
		'PaymentMethod',
	];

	// enable disappearing box shadow effect on filter options
	useEffect(() => {
		const intialFilterOptionsRef = filterOptionsRef.current;
		const observer = new IntersectionObserver(
			([element]) => {
				if (element.intersectionRatio < 1 && !stickyFilter) {
					setStickyFilter(true);
				}

				if (element.intersectionRatio >= 1 && stickyFilter) {
					setStickyFilter(false);
				}
			},
			{
				threshold: [1],
			}
		);

		if (intialFilterOptionsRef) {
			observer.observe(intialFilterOptionsRef);
		}

		return () => {
			if (intialFilterOptionsRef) {
				observer.unobserve(intialFilterOptionsRef);
			}
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setStickyFilter, stickyFilter, selectedProfile]);

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

	const applySearchText = (profiles, fields, searchText) => {
		const matchingProfiles = profiles.filter((profile) => {
			let isMatch = false;

			fields.some((field) => {
				if (
					profile[field]
						.toLocaleLowerCase()
						.includes(searchText.toLocaleLowerCase())
				) {
					isMatch = true;
					return true;
				}

				return false;
			});

			return isMatch;
		});

		return matchingProfiles;
	};

	const applyFilterOptions = (filters, profiles) => {
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

	const resetCurrentProfiles = (availableProfiles) => {
		const startIndexOfNextPage = constants.RECORDS_PER_PAGE * 0;
		const endIndexOfNextPage = startIndexOfNextPage + 20;

		setCurrentPageNumber(1);
		setCurrentProfiles(
			availableProfiles.slice(startIndexOfNextPage, endIndexOfNextPage)
		);
	};

	const handleSearchChange = (searchText) => {
		let newFilteredProfiles = applySearchText(
			totalRecords,
			['FirstName', 'LastName'],
			searchText
		);

		newFilteredProfiles = applyFilterOptions(
			activeFilters,
			newFilteredProfiles
		);

		setFilteredProfiles(newFilteredProfiles);
		resetCurrentProfiles(newFilteredProfiles);
	};

	const handleApplyNewFilters = (newFilters) => {
		const searchText = searchInputRef.current.value;

		let newFilteredProfiles = applySearchText(
			totalRecords,
			['FirstName', 'LastName'],
			searchText
		);

		newFilteredProfiles = applyFilterOptions(newFilters, newFilteredProfiles);

		setActiveFilters(newFilters);
		setFilteredProfiles(newFilteredProfiles);
		resetCurrentProfiles(newFilteredProfiles);
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

	const showAllProfiles = () => {
		setSelectedProfile(null);
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

			{selectedProfile ? (
				<Box px='5'>
					<ProfileDetails
						profile={selectedProfile}
						showAllProfiles={showAllProfiles}
					/>
				</Box>
			) : (
				<>
					<Text mt='2' px='5'>
						Here's an overview of some of our users and some of their recent
						transactions
					</Text>

					<TableFilterMenu
						filterOptionsRef={filterOptionsRef}
						stickyFilter={stickyFilter}
						handleSearchChange={handleSearchChange}
						searchInputRef={searchInputRef}
						possibleFilters={possibleFilters}
						activeFilters={activeFilters}
						handleApplyNewFilters={handleApplyNewFilters}
					/>

					<Box mt='5' px='5'>
						<Flex justify='space-between' my='3' color='gray.500' wrap='wrap'>
							<Text mb='2'>Showing 1-20 records per page</Text>
							<Text mb='2'>{`${totalRecords.length} total records / Page ${currentPageNumber}`}</Text>
						</Flex>

						<Box overflowX='auto'>
							<RecordTable
								users={currentProfiles}
								headers={tableHeaders}
								properties={recordProperties}
								setSelected={setSelectedProfile}
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
				</>
			)}
		</div>
	);
};

export default App;
