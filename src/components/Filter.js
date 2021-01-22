import React, { useEffect, useState } from 'react';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	Button,
	Select,
	FormLabel,
	FormControl,
	Flex,
	Icon,
	Text,
} from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';

const Filter = ({ possibleFilters, activeFilters, handleApplyFiters }) => {
	const [selectedOptions, setSelectedOptions] = useState([]);

	const handleFiltersSubmit = (event) => {
		event.preventDefault();

		const newActiveFilters = possibleFilters.reduce((acc, filter) => {
			const formElement = event.target.elements[filter.keyName];

			if (!formElement.value) {
				return acc;
			}

			return acc.concat({
				...filter,
				options: [formElement.value],
			});
		}, []);

		handleApplyFiters(newActiveFilters);
	};

	const handleSelectChange = (event) => {
		const newSelectOptions = selectedOptions.map((option) => {
			if (option.keyName === event.target.name) {
				return {
					...option,
					selectedOptions: event.target.value,
				};
			}

			return option;
		});

		setSelectedOptions(newSelectOptions);
	};

	const handleClearFilters = () => {
		setSelectedOptions(
			selectedOptions.map((option) => ({
				...option,
				selectedOptions: null,
			}))
		);
		handleApplyFiters([]);
	};

	const filterHeader = activeFilters.length ? (
		<Button variant='outline'>
			<Flex alignItems='center'>
				<Text
					mr='1'
					verticalAlign='middle'
					fontWeight='600'
					color='green.400'
					fontSize='sm'
				>
					Filtered by
				</Text>
				<Icon as={FaFilter} w={3} height={3} mt='-1' fill='green.400' />
				<Text
					mr='2'
					verticalAlign='middle'
					fontWeight='600'
					color='green.400'
					fontSize='sm'
				>
					{`: ${activeFilters.map((filter) => filter.title).join(', ')}`}
				</Text>
			</Flex>
		</Button>
	) : (
		<Button variant='outline'>
			<Flex alignItems='center' color='gray.500'>
				<Text mr='2' verticalAlign='middle' fontWeight='500'>
					Filter
				</Text>
				<Icon as={FaFilter} w={3} height={3} mt='-1' />
			</Flex>
		</Button>
	);

	useEffect(() => {
		const newSelectedOptions = [
			...possibleFilters.map((possibleFilter) => {
				const matchingActiveFilter = activeFilters.find(
					(activeFilter) => activeFilter.keyName === possibleFilter.keyName
				);

				if (matchingActiveFilter) {
					const newSelectedFilter = {
						...possibleFilter,
						selectedOptions: matchingActiveFilter.options[0],
					};

					return newSelectedFilter;
				}

				return possibleFilter;
			}),
		];

		setSelectedOptions(newSelectedOptions);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [possibleFilters, activeFilters]);

	return (
		<Popover placement='bottom'>
			<PopoverTrigger>{filterHeader}</PopoverTrigger>

			<PopoverContent fontSize='sm' boxShadow='md'>
				<PopoverArrow />
				<PopoverHeader>Filter by</PopoverHeader>
				<PopoverCloseButton />
				<PopoverBody>
					<form onSubmit={handleFiltersSubmit}>
						{possibleFilters.map((filter) => (
							<FormControl key={filter.keyName} mb='15px'>
								<FormLabel fontSize='sm'>{filter.title}</FormLabel>
								<Select
									name={filter.keyName}
									size='sm'
									value={
										selectedOptions.find(
											(option) => option.keyName === filter.keyName
										)?.selectedOptions || ''
									}
									onChange={handleSelectChange}
								>
									<option value=''>select option</option>
									{filter.options.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</Select>
							</FormControl>
						))}

						<Flex justifyContent='space-between'>
							<Button size='sm' mt={4} colorScheme='green' type='submit'>
								Apply
							</Button>

							{activeFilters.length ? (
								<Button
									onClick={handleClearFilters}
									size='sm'
									mt={4}
									variant='outline'
									colorScheme='green'
								>
									Clear
								</Button>
							) : null}
						</Flex>
					</form>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};

export default Filter;
