import React from 'react';
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import TableRow from './TableRow';

const RecordTable = ({ users, headers, properties, setSelected }) => {
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
					<TableRow
						onClick={() => setSelected(user)}
						key={user.Email}
						properties={properties}
						user={user}
					/>
				))}
			</Tbody>
		</Table>
	);
};

export default RecordTable;
