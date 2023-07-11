import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import PublicationsList from '../../../components/Publications/list';

const getPublicationsServices = async () => {
	// FIX: mapea response.data a publicaciones por cambio en backend
	const endpoint = `${process.env.REACT_APP_BACKEND_URL}/admin_publications`;
	try {
		const response = await axios.get(endpoint);
		const publications = response.data.map((item) => item.publication);
		return publications;
	} catch (error) {
		console.error(error);
	}
};

const AdminPublications = () => {
	const [publications, setPublications] = useState([]);

	useEffect(() => {
		getPublicationsServices().then((publications) =>
			setPublications(publications)
		);
	}, []);

	const updatePublications = (newPublications) =>
		setPublications(newPublications);

	const totalPublications = publications?.length || 0;

	return (
		<>
			<ToastContainer />
			<div className='container mx-auto'>
				<h1 className='my-3 breadcrumb-title'>
					Listado de noticias ({totalPublications})
				</h1>
				<Breadcrumb />
				<PublicationsList
					publications={publications}
					updatePublications={updatePublications}
				/>
			</div>
		</>
	);
};

export default AdminPublications;
