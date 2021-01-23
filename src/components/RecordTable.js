import React from 'react';
import { Table, Thead, Tbody, Tr, Th, SkeletonText } from '@chakra-ui/react';
import TableRow from './TableRow';

const RecordTable = ({
	isLoading,
	users,
	headers,
	properties,
	setSelected,
}) => {
	return (
		<Table variant='simple'>
			<SkeletonText noOfLines={10} spacing='4' isLoaded={!isLoading}>
				<Thead>
					<Tr>
						{headers.map((header) => (
							<Th key={header}>{header}</Th>
						))}
					</Tr>
				</Thead>

				<Tbody>
					{users.map((user) => (
						<TableRow
							onClick={() => setSelected(user)}
							key={user.Email}
							properties={properties}
							user={user}
						/>
					))}
				</Tbody>
			</SkeletonText>
		</Table>
	);
};

export default RecordTable;
