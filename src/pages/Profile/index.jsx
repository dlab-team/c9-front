import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTwitter,
	faInstagram,
	faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';

const Profile = () => {
	let { username } = useParams();
	const [currentProfile, setCurrentProfile] = useState({});

	const { currentUser } = useContext(AuthContext);

	const getProfile = async () => {
		username = currentUser.username;
		const endpoint = `${process.env.REACT_APP_BACKEND_URL}/users/profile/${username}`;
		const response = await axios.get(endpoint);
		setCurrentProfile(response.data);
	};

	useEffect(() => {
		getProfile();
	}, []);

	const publicaciones = currentProfile.publications;

	return (
		<div className='container mx-auto'>
			<div className='my-5 float-right'>
				<img
					src='https://cdn.icon-icons.com/icons2/1999/PNG/512/avatar_people_person_profile_user_woman_icon_123368.png'
					alt='foto de perfil'
					className='h-[120px] shadow-lg rounded border border-gray-300'
				/>
			</div>
			<h1 className='my-3 breadcrumb-title'>{currentProfile.name}</h1>
			{/* <Breadcrumb />
			<div className="mt-5">
				<Link
					to="/mi-perfil"
					className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
				>
					Editar Perfil
				</Link>
			</div> */}

			<h2 className='mt-5 text-2xl font-bold'>¿Quién soy?</h2>
			<p
				className='text-lg my-4'
				dangerouslySetInnerHTML={{ __html: currentProfile.description }}
			></p>

			<h2 className='text-2xl font-bold mb-2'>Mis publicaciones</h2>
			<ul className='list-disc ml-6'>
				{publicaciones ? (
					publicaciones.map((publicacion, index) => (
						<li key={index} className='mb-2'>
							<FontAwesomeIcon icon={faCalendarAlt} className='mr-2' />
							{new Date(publicacion.fecha_publicacion).toLocaleDateString(
								'en-GB'
							)}{' '}
							- {publicacion.name}
						</li>
					))
				) : (
					<p>Aún sin publicaciones</p>
				)}
			</ul>
		</div>
	);
};

export default Profile;
