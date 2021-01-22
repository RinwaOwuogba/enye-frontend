import React from 'react';
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import TableRow from './TableRow';

const RecordTable = ({ users = [], headers, properties }) => {
	return (
		<Table variant='simple'>
			<Thead>
				<Tr>
					{headers.map((header) => (
						<Th key={header}>{header}</Th>
					))}
				</Tr>
			</Thead>

			<Tbody>
				{users.map((user) => (
					<TableRow key={user.Email} properties={properties} user={user} />
				))}
			</Tbody>
		</Table>
	);
};

export default RecordTable;
