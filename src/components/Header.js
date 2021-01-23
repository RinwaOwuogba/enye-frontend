import React from 'react';
import { Flex, Heading, Icon } from '@chakra-ui/react';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

const Header = () => {
	return (
		<header className='App-header'>
			<Flex mt='5' alignItems='center'>
				<Heading
					mr='2'
					color='green.400'
					fontSize={{ base: '1.5rem', md: '1.7rem', lg: '2rem ' }}
				>
					Transax
				</Heading>
				<Icon as={RiMoneyDollarCircleFill} h={10} w={10} fill='green.400' />
			</Flex>
		</header>
	);
};

export default Header;
