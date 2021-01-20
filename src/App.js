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
import apiResponse from './records.json';

import './App.css';

const App = () => {
	const filterOptionsRef = useRef(null);

	const [filteredProfiles, setFilteredProfiles] = useState(
		apiResponse.records.profiles
	);
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

	const handleSearchChange = (event) => {
		const searchText = event.target.value;

		setFilteredProfiles(
			apiResponse.records.profiles.filter(
				(profile) =>
					profile.FirstName.includes(searchText) ||
					profile.LastName.includes(searchText)
			)
		);
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<Heading
					mt='5'
					fontSize={{ base: '1.5rem', md: '2.5rem', lg: '2rem ' }}
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
			>
				<div className='search-container'>
					<InputGroup>
						<InputLeftElement pointerEvents='none'>
							<Search2Icon />
						</InputLeftElement>
						<Input
							onChange={handleSearchChange}
							placeholder='search users by first name or last name'
						/>
					</InputGroup>
				</div>
			</Flex>

			<Box mt='5' px='5'>
				<Flex justify='space-between' my='3' color='gray.500' px='5'>
					<Text>{`${filteredProfiles.length} user records`}</Text>
					<Text>Showing 1-20 records per page</Text>
				</Flex>

				<RecordTable
					users={filteredProfiles.slice(0, 20)}
					headers={tableHeaders}
					properties={recordProperties}
				/>
			</Box>
		</div>
	);
};

export default App;
