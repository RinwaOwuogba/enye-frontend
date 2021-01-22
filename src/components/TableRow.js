import React from 'react';
import { Tr, Td } from '@chakra-ui/react';

import './TableRow.css';

const TableRow = ({ user, properties, onClick }) => {
	return (
		<Tr className='table-row' onClick={onClick}>
			{properties.map((property) => (
				<Td key={property}>{user[property]}</Td>
			))}
		</Tr>
	);
};

export default TableRow;
