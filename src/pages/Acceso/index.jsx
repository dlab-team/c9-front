import React, { useState, useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import logoBlue from '../../assets/images/logo_innova_blue.png';
import waves from '../../assets/images/wave-blue.png';
import googleIcon from '../../assets/images/google-icon.png';
import fondo from '../../assets/images/innovafondoazul.jpeg';
import logoMercurio from '../../assets/images/0_mercurio-logo.png';
import logoMicrosoft from '../../assets/images/0_microsoft_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner';
import { Link } from 'react-router-dom';
import { Ripple, initTE } from 'tw-elements';

initTE({ Ripple });

const loginService = async (email, password) => {
	const endPoint = `${process.env.REACT_APP_BACKEND_URL}/users/auth`;
	try {
		const { data } = await axios.post(endPoint, { email, password });
		const isError = data.startsWith('Error:');
		if (isError) {
			throw new Error('Usuario no registrado');
		}
		return data;
	} catch (error) {
		throw new Error('Error al iniciar sesión');
	}
};

const Admin = () => {
	const { setUserLogin } = useContext(AuthContext);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const [errors, setErrors] = useState({ email: '', password: '' });
	const [isLoading, setIsLoading] = useState(false);
	const [loginMessage, setLoginMessage] = useState('');
	const navigate = useNavigate();

	const isValidEmail = (email) => {
		// Expresión regular para validar el formato de correo electrónico
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const isValidPassword = (password) => {
		return password.length >= 8;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let isValid = true;
		const newErrors = { email: '', password: '' };

		// Validar email
		if (!emailRef.current.value) {
			isValid = false;
			newErrors.email = 'El email es requerido';
		} else if (!isValidEmail(emailRef.current.value)) {
			isValid = false;
			newErrors.email = 'El email debe tener un formato válido';
		}

		// Validar contraseña
		if (!passwordRef.current.value) {
			isValid = false;
			newErrors.password = 'La contraseña es requerida';
		} else if (!isValidPassword(passwordRef.current.value)) {
			isValid = false;
			newErrors.password = 'La contraseña debe tener mínimo 8 caracteres';
		}

		// Actualizar el estado de los errores
		setErrors(newErrors);

		if (isValid) {
			try {
				setIsLoading(true);
				const token = await loginService(
					emailRef.current.value,
					passwordRef.current.value
				);
				setUserLogin(token);
				navigate('/admin/publications');
				setLoginMessage('Te has logueado con éxito');
				toast.success('Te has logueado con éxito');
			} catch (error) {
				setIsLoading(false);
				toast(error.message, {
					type: 'error',
					autoClose: 3000,
				});
			}
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		// Validar el contenido en tiempo real y actualizar los errores
		if (name === 'email') {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: !value
					? 'El email es requerido'
					: !isValidEmail(value)
					? 'El email debe tener un formato válido'
					: '',
			}));
		} else if (name === 'password') {
			setErrors((prevErrors) => ({
				...prevErrors,
				password: !value
					? 'La contraseña es requerida'
					: !isValidPassword(value)
					? 'La contraseña debe tener mínimo 8 caracteres'
					: '',
			}));
		}

		// Borrar el mensaje de error cuando el valor sea válido
		if (name === 'email' && isValidEmail(value)) {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: '',
			}));
		} else if (name === 'password' && isValidPassword(value)) {
			setErrors((prevErrors) => ({
				...prevErrors,
				password: '',
			}));
		}
	};

	return (
		<>
			<ToastContainer></ToastContainer>
			<div className='flex h-screen'>
				<div className='hidden lg:flex lg:w-1/2 items-stretch justify-center'>
					<img
						className='waves h-full w-full relative'
						style={{
							backgroundImage: `url(${fondo})`,
							backgroundSize: 'cover',
							objectPosition: 'right',
						}}
						src={waves}
						alt='background-waves'
					/>
					<div className='h-full flex items-center pl-0 absolute'>
						<Link to='/'>
							<img
								className='w-64 2xl:w-80 h-auto'
								src={logoBlue}
								alt='Una imagen del Logo de Innova'
							/>
						</Link>
					</div>
				</div>
				<div className='mx-auto lg:w-1/2 lg:p-12'>
					<div className='flex flex-col justify-center h-full md:shrink-0'>
						<div>
							<h2
								className="text-4xl md:text-5xl lg:text-4xl 2xl:text-5xl mt-8 font-bold text-center 
            text-primary font-['Caveat_Brush'] leading-3 tracking-widest font-normal uppercase"
							>
								Bienvenido!
							</h2>
							{isLoading && (
								<div className='mt-14 flex items-center justify-center'>
									<Spinner />
								</div>
							)}
							<form
								onSubmit={handleSubmit}
								className='mt-10 mx-12 md:mx-auto lg:mx-28 2xl:mx-56'
								noValidate
							>
								<div className='relative mb-1'>
									<label
										htmlFor='inputEmail'
										className='block mb-2 text-sm font-medium text-primary'
									>
										Email
									</label>
									<input
										type='email'
										className={`block min-h-[auto] w-full rounded-md border-2 ${
											errors.email
												? 'border-b-red-600 focus:border-red-600'
												: ''
										} focus:border-blue-500 focus:outline-none bg-gray-200 px-3 py-[0.20rem] 2xl:py-[0.50rem] leading-[1.6]`}
										id='inputEmail'
										name='inputEmail'
										aria-describedby='email'
										placeholder='usuario@innova.cl'
										ref={emailRef}
										onChange={handleInputChange}
									/>
								</div>
								{errors.email && (
									<span className='text-red-500 text-xs'>{errors.email}</span>
								)}

								<div className='relative mb-1'>
									<label
										htmlFor='passwordInput'
										className='block my-2 text-sm font-medium text-primary'
									>
										Contraseña
									</label>
									<input
										type='password'
										className={`block min-h-[auto] w-full rounded-md border-2 ${
											errors.password
												? 'border-b-red-600 focus:border-red-600'
												: ''
										} border-gray-200 focus:border-blue-500 focus:outline-none bg-gray-200 px-3 py-[0.20rem] 2xl:py-[0.50rem] leading-[1.6] focus:placeholder:opacity-100`}
										id='passwordInput'
										name='passwordInput'
										placeholder='Contraseña'
										ref={passwordRef}
										onChange={handleInputChange}
									/>
								</div>
								{errors.password && (
									<span className='text-red-500 text-xs'>
										{errors.password}
									</span>
								)}

								{isLoading ? (
									<button
										type='submit'
										data-te-ripple-init
										data-te-ripple-color='light'
										disabled={isLoading}
										className={`${
											isLoading
												? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400'
												: ''
										} inline-block w-full rounded-md bg-secondary hover:bg-yellow hover:text-primary px-6 pb-2 pt-2.5 text-xs mt-6 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out`}
									>
										Ingresando...
									</button>
								) : (
									<button
										type='submit'
										disabled={isLoading}
										className={`${
											isLoading
												? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400'
												: ''
										} inline-block w-full rounded-md bg-secondary hover:bg-yellow hover:text-primary px-6 pb-2 pt-2.5 text-xs mt-6 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out`}
									>
										Ingresa
									</button>
								)}
								<section className='iniciaSesionCon text-center mb-16 md:m-20 lg:m-16 nowrap'>
									<p className="text-2xl md:text-3xl lg:text-2xl mt-10 font-normal text-[#00235C] font-['Caveat'] italic leading-4 tracking-wide">
										Inicia sesión con
									</p>
									<div className='flex gap-8 lg:gap-6 mt-6 justify-center'>
										<img
											src={googleIcon}
											className='w-6 h-6 md:w-9 md:h-9 lg:w-6 lg:h-6'
											alt='google-icon'
										/>
										<FontAwesomeIcon
											icon={faLinkedin}
											className='w-6 h-6 md:w-9 md:h-9 lg:w-6 lg:h-6'
											style={{ color: '#3b68b5' }}
										/>
										<FontAwesomeIcon
											icon={faFacebook}
											className='w-6 h-7 md:w-9 md:h-9 lg:w-6 lg:h-6'
											style={{ color: '#3e74d0' }}
										/>
									</div>
								</section>
							</form>
						</div>
						<section className='logos flex justify-between items-center md:shrink-0 mx-14 md:mx-3 lg:mx-28 2xl:mx-56'>
							<img
								className='h-6 w-24 md:w-36 md:h-8 lg:w-28 lg:h-6'
								src={logoMicrosoft}
								alt='logo-microsoft'
							/>

							<img
								className='h-5 w-20 md:w-32 md:h-6 lg:w-32 lg:h-5'
								src={logoMercurio}
								alt='logo-mercurio'
							/>
						</section>
					</div>
				</div>
			</div>
		</>
	);
};

export default Admin;
