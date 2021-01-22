import { ArrowBackIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';

const ProfileDetails = ({ profile, showAllProfiles }) => {
	const profileProperties = [
		'First Name',
		'Last Name',
		'Gender',
		'Latitude',
		'Longitude',
		'Credit Card Number',
		'Credit Card Type',
		'Email',
		'Domain Name',
		'Phone Number',
		'Mac Address',
		'URL',
		'User Name',
		'Last Login',
		'Payment Method',
	];

	// move window view to top of viewport because of previous
	// scroll position being lower than top
	useEffect(() => window.scrollTo({ top: 0 }), []);

	return (
		<Box>
			<Button variant='ghost' onClick={showAllProfiles}>
				<ArrowBackIcon w={6} h={6} />
			</Button>

			<Container centerContent>
				<Box w='500px' maxWidth='80%'>
					{profileProperties.map((property) => (
						<FormControl key={property} mb='10'>
							<FormLabel fontWeight='600' color='gray.600'>
								{property}
							</FormLabel>
							<Input defaultValue={profile[property.split(' ').join('')]} />
						</FormControl>
					))}
				</Box>
			</Container>
		</Box>
	);
};

export default ProfileDetails;
