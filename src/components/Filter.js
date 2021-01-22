import React from 'react';
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

	return (
		<Popover placement='bottom'>
			<PopoverTrigger>
				{activeFilters.length ? (
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
				)}
			</PopoverTrigger>

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
									placeholder='select option'
								>
									{filter.options.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</Select>
							</FormControl>
						))}

						<Button size='sm' mt={4} colorScheme='green' type='submit'>
							Apply
						</Button>
					</form>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};

export default Filter;
