import React from 'react';
import { Tooltip } from 'react-tippy';
import TextToSpeech from '../../TextToSpeach/TextToSpeach';

function formatFecha(publicationDate) {
	const fecha = new Date(publicationDate);
	const numeroDia = fecha.getDate();
	const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' });

	return (
		<div className='bg-gray-200 text-center py-4 md:p-5 rounded'>
			<p className='text-sm md:text-4xl font-bolder'>{numeroDia}</p>
			<p className='text-xs'>{nombreMes}</p>
		</div>
	);
}

const DetailDesktop = ({ publication }) => {
	return (
		<div className='relative container mx-auto whitespace-normal'>
			<div className='grid grid-cols-7 md:grid-cols-8 gap-2 md:gap-4'>
				<div data-html2canvas-ignore='true' className='col-span-1'>
					{formatFecha(publication?.publicationDate)}
					<div className='sm:inline-block rounded-md whitespace-nowrap w-full bg-blue-50 text-primary p-2 text-center align-baseline text-[0.58em] md:text-[0.70em] leading-none mt-4'>
						Visitas:
						<p className='text-green-600 text-lg'>{publication?.visits}</p>
					</div>
					<ul
						className='xs:hidden lg:block mr-4 flex list-none flex-row flex-wrap pl-0'
						role='tablist'
						data-te-nav-ref
					>
						<li role='presentation' className='flex-grow text-center'>
							<a
								href='#tabs-home03'
								className='my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-6 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400'
								data-te-toggle='pill'
								data-te-target='#tabs-home03'
								data-te-nav-active
								role='tab'
								aria-controls='tabs-home03'
								aria-selected='true'
							>
								Español
							</a>
						</li>
						<li role='presentation' className='flex-grow text-center'>
							<a
								href='#tabs-profile03'
								className='focus:border-transparen my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-6 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400'
								data-te-toggle='pill'
								data-te-target='#tabs-profile03'
								role='tab'
								aria-controls='tabs-profile03'
								aria-selected='false'
							>
								Inglés
							</a>
						</li>
					</ul>
					<div className='flex flex-row items-center justify-center bg-gray-200 rounded-md mt-2'>
						<div>
							<Tooltip title='Descargar noticia' position='bottom' arrow={true}>
								<button
									onClick={() => {
										html2pdf().set(opt).from(newsToPdf).save();
									}}
								>
									{' '}
									Pdf
								</button>
							</Tooltip>
						</div>
					</div>
				</div>
				<div className='col-span-6 md:col-span-7'>
					<div className='my-2'>
						<div
							className='hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block'
							id='tabs-home03'
							role='tabpanel'
							aria-labelledby='tabs-home-tab03'
							data-te-tab-active
						>
							<article id='content-text' className='innova-text'></article>
							<div data-html2canvas-ignore='true' className='text-end mt-2'>
								{publication?.keywords.map((item, index) => (
									<a
										href={`/publications/keyword/${item}`}
										className='inline-block whitespace-nowrap rounded bg-gray-200 p-2 ml-1 my-3 text-center align-baseline text-[0.7em] md:text-[0.85em] font-bold leading-none text-gray-500 hover:shadow-lg ease-in-out hover:scale-110'
										key={index}
									>
										#{item}
									</a>
								))}
							</div>
							<Tooltip title='Escuchar noticia' position='bottom' arrow={true}>
								<TextToSpeech text={publication?.finalContent} />
							</Tooltip>
							{/* marca */}
						</div>
						<div
							className='hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block'
							id='tabs-profile03'
							role='tabpanel'
							aria-labelledby='tabs-profile-tab03'
						>
							<div id='content-text_EN' className='innova-text'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailDesktop;
