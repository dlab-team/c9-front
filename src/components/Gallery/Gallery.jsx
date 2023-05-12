import { useState, useEffect} from 'react';
import styles from "./Gallery.module.css";
import { Filters } from "../../components"
import axios from 'axios';


const Gallery = () => {
    const [news, setNews] = useState([]);
    const endpoint = "/news_gallery.json"
    //usar useNavigate para linkear la foto, el título a la vista detalle

     //Consultar api
    const getNewsData = async () => {
        try {
        const response = await axios.get(endpoint);
        const data = response.data;
    
        setNews(data.cards);
        console.log(data);
        } catch (error) {
        console.error(error);
        }
    };
    
    //Llamar a la función
    useEffect(()=>{
        getNewsData();
    }, []);

    return (
        <>
        <Filters/>
        <div className={`${styles.gallery} columns-1 md:columns-3 lg:columns-3`} style={{ columnGap: '1px' }}>
            {news.map((n) => (
            <div className="block max-h-100 max-w-sm rounded-2xl overflow-hidden border border-gray-200 mb-3 mr-1 bg-white shadow-gray-200 shadow-xl duration-300 hover:shadow-xl hover:shadow-black/20" key={n.id} >
                <div className="relative overflow-hidden bg-cover bg-no-repeat" 
                    data-te-ripple-init
                    data-te-ripple-color="light"
                >
                    <img className="max-w-full h-full object-cover rounded-t-lg transition duration-300 ease-in-out hover:opacity-70" src={n.imagen} alt={n.titulo}/>  
                    
                </div>
                <div className="px-4 py-3 leading-normal text-left">
                    <h1 className='text-md font-bold pb-3'>{n.titulo}</h1>
                    <p className="card-date font-thin text-xs pb-2">Creado {n.fecha}</p>
                    <p className={`${styles.cardText} text-xs font-thin`}>{n.noticia}</p>
                </div>
                <div className="px-4 py-3">
                    <p className="text-sm leading-normal">@{n.usuario}</p>
                </div>
            </div>
            ))}
        </div>
        </>
    )
}

export default Gallery

