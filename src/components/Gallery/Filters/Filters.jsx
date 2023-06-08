import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Select, initTE } from 'tw-elements';

// TODO: traer esta data desde el back
const regiones = [
  {
    region: 'Metropolitana de Santiago',
    comunas: [
      'Cerrillos',
      'Cerro Navia',
      'Conchalí',
      'El Bosque',
      'Estación Central',
      'Huechuraba',
      'Independencia',
      'La Cisterna',
      'La Florida',
      'La Granja',
      'La Pintana',
      'La Reina',
      'Las Condes',
      'Lo Barnechea',
      'Lo Espejo',
      'Lo Prado',
      'Macul',
      'Maipú',
      'Ñuñoa',
      'Pedro Aguirre Cerda',
      'Peñalolén',
      'Providencia',
      'Pudahuel',
      'Quilicura',
      'Quinta Normal',
      'Recoleta',
      'Renca',
      'Santiago',
      'San Joaquín',
      'San Miguel',
      'San Ramón',
      'Vitacura',
      'Puente Alto',
      'Pirque',
      'San José de Maipo',
      'Colina',
      'Lampa',
      'Tiltil',
      'San Bernardo',
      'Buin',
      'Calera de Tango',
      'Paine',
      'Melipilla',
      'Alhué',
      'Curacaví',
      'María Pinto',
      'San Pedro',
      'Talagante',
      'El Monte',
      'Isla de Maipo',
      'Padre Hurtado',
      'Peñaflor',
    ],
  },
  {
    region: 'Arica y Parinacota',
    comunas: ['Arica', 'Camarones', 'Putre', 'General Lagos'],
  },
  {
    region: 'Tarapacá',
    comunas: [
      'Iquique',
      'Alto Hospicio',
      'Pozo Almonte',
      'Camiña',
      'Colchane',
      'Huara',
      'Pica',
    ],
  },
  {
    region: 'Antofagasta',
    comunas: [
      'Antofagasta',
      'Mejillones',
      'Sierra Gorda',
      'Taltal',
      'Calama',
      'Ollagüe',
      'San Pedro de Atacama',
      'Tocopilla',
      'María Elena',
    ],
  },
  {
    region: 'Atacama',
    comunas: [
      'Copiapó',
      'Caldera',
      'Tierra Amarilla',
      'Chañaral',
      'Diego de Almagro',
      'Vallenar',
      'Alto del Carmen',
      'Freirina',
      'Huasco',
    ],
  },
  {
    region: 'Coquimbo',
    comunas: [
      'La Serena',
      'Coquimbo',
      'Andacollo',
      'La Higuera',
      'Paiguano',
      'Vicuña',
      'Illapel',
      'Canela',
      'Los Vilos',
      'Salamanca',
      'Ovalle',
      'Combarbalá',
      'Monte Patria',
      'Punitaqui',
      'Río Hurtado',
    ],
  },
  {
    region: 'Valparaíso',
    comunas: [
      'Valparaíso',
      'Casablanca',
      'Concón',
      'Juan Fernández',
      'Puchuncaví',
      'Quintero',
      'Viña del Mar',
      'Isla de Pascua',
      'Los Andes',
      'Calle Larga',
      'Rinconada',
      'San Esteban',
      'La Ligua',
      'Cabildo',
      'Papudo',
      'Petorca',
      'Zapallar',
      'Quillota',
      'Calera',
      'Hijuelas',
      'La Cruz',
      'Nogales',
      'San Antonio',
      'Algarrobo',
      'Cartagena',
      'El Quisco',
      'El Tabo',
      'Santo Domingo',
      'San Felipe',
      'Catemu',
      'Llaillay',
      'Panquehue',
      'Putaendo',
      'Santa María',
      'Quilpué',
      'Limache',
      'Olmué',
      'Villa Alemana',
    ],
  },
  {
    region: 'Libertador Gral. Bernardo O’Higgins',
    comunas: [
      'Rancagua',
      'Codegua',
      'Coinco',
      'Coltauco',
      'Doñihue',
      'Graneros',
      'Las Cabras',
      'Machalí',
      'Malloa',
      'Mostazal',
      'Olivar',
      'Peumo',
      'Pichidegua',
      'Quinta de Tilcoco',
      'Rengo',
      'Requínoa',
      'San Vicente',
      'Pichilemu',
      'La Estrella',
      'Litueche',
      'Marchihue',
      'Navidad',
      'Paredones',
      'San Fernando',
      'Chépica',
      'Chimbarongo',
      'Lolol',
      'Nancagua',
      'Palmilla',
      'Peralillo',
      'Placilla',
      'Pumanque',
      'Santa Cruz',
    ],
  },
  {
    region: 'Maule',
    comunas: [
      'Talca',
      'Constitución',
      'Curepto',
      'Empedrado',
      'Maule',
      'Pelarco',
      'Pencahue',
      'Río Claro',
      'San Clemente',
      'San Rafael',
      'Cauquenes',
      'Chanco',
      'Pelluhue',
      'Curicó',
      'Hualañé',
      'Licantén',
      'Molina',
      'Rauco',
      'Romeral',
      'Sagrada Familia',
      'Teno',
      'Vichuquén',
      'Linares',
      'Colbún',
      'Longaví',
      'Parral',
      'Retiro',
      'San Javier',
      'Villa Alegre',
      'Yerbas Buenas',
    ],
  },
  {
    region: 'Ñuble',
    comunas: [
      'Cobquecura',
      'Coelemu',
      'Ninhue',
      'Portezuelo',
      'Quirihue',
      'Ránquil',
      'Treguaco',
      'Bulnes',
      'Chillán Viejo',
      'Chillán',
      'El Carmen',
      'Pemuco',
      'Pinto',
      'Quillón',
      'San Ignacio',
      'Yungay',
      'Coihueco',
      'Ñiquén',
      'San Carlos',
      'San Fabián',
      'San Nicolás',
    ],
  },
  {
    region: 'Biobío',
    comunas: [
      'Concepción',
      'Coronel',
      'Chiguayante',
      'Florida',
      'Hualqui',
      'Lota',
      'Penco',
      'San Pedro de la Paz',
      'Santa Juana',
      'Talcahuano',
      'Tomé',
      'Hualpén',
      'Lebu',
      'Arauco',
      'Cañete',
      'Contulmo',
      'Curanilahue',
      'Los Álamos',
      'Tirúa',
      'Los Ángeles',
      'Antuco',
      'Cabrero',
      'Laja',
      'Mulchén',
      'Nacimiento',
      'Negrete',
      'Quilaco',
      'Quilleco',
      'San Rosendo',
      'Santa Bárbara',
      'Tucapel',
      'Yumbel',
      'Alto Biobío',
    ],
  },
  {
    region: 'La Araucanía',
    comunas: [
      'Temuco',
      'Carahue',
      'Cunco',
      'Curarrehue',
      'Freire',
      'Galvarino',
      'Gorbea',
      'Lautaro',
      'Loncoche',
      'Melipeuco',
      'Nueva Imperial',
      'Padre las Casas',
      'Perquenco',
      'Pitrufquén',
      'Pucón',
      'Saavedra',
      'Teodoro Schmidt',
      'Toltén',
      'Vilcún',
      'Villarrica',
      'Cholchol',
      'Angol',
      'Collipulli',
      'Curacautín',
      'Ercilla',
      'Lonquimay',
      'Los Sauces',
      'Lumaco',
      'Purén',
      'Renaico',
      'Traiguén',
      'Victoria',
    ],
  },
  {
    region: 'Los Ríos',
    comunas: [
      'Valdivia',
      'Corral',
      'Lanco',
      'Los Lagos',
      'Máfil',
      'Mariquina',
      'Paillaco',
      'Panguipulli',
      'La Unión',
      'Futrono',
      'Lago Ranco',
      'Río Bueno',
    ],
  },
  {
    region: 'Los Lagos',
    comunas: [
      'Puerto Montt',
      'Calbuco',
      'Cochamó',
      'Fresia',
      'Frutillar',
      'Los Muermos',
      'Llanquihue',
      'Maullín',
      'Puerto Varas',
      'Castro',
      'Ancud',
      'Chonchi',
      'Curaco de Vélez',
      'Dalcahue',
      'Puqueldón',
      'Queilén',
      'Quellón',
      'Quemchi',
      'Quinchao',
      'Osorno',
      'Puerto Octay',
      'Purranque',
      'Puyehue',
      'Río Negro',
      'San Juan de la Costa',
      'San Pablo',
      'Chaitén',
      'Futaleufú',
      'Hualaihué',
      'Palena',
    ],
  },
  {
    region: 'Aisén del Gral. Carlos Ibáñez del Campo',
    comunas: [
      'Coihaique',
      'Lago Verde',
      'Aisén',
      'Cisnes',
      'Guaitecas',
      'Cochrane',
      'O’Higgins',
      'Tortel',
      'Chile Chico',
      'Río Ibáñez',
    ],
  },
  {
    region: 'Magallanes y de la Antártica Chilena',
    comunas: [
      'Punta Arenas',
      'Laguna Blanca',
      'Río Verde',
      'San Gregorio',
      'Cabo de Hornos (Ex Navarino)',
      'Antártica',
      'Porvenir',
      'Primavera',
      'Timaukel',
      'Natales',
      'Torres del Paine',
    ],
  },
];

const categorias = [
  { name: 'General' },
  { name: 'Tecnología' },
  { name: 'Ciencia' },
  { name: 'Entretenimiento' },
  { name: 'Espacio' },
];

const Filters = () => {
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isComunaOpen, setIsComunaOpen] = useState(false);
  const [isCategoriaOpen, setIsCategoriaOpen] = useState(false);

  const regionDropdownRef = useRef(null);
  const comunaDropdownRef = useRef(null);
  const categoriaDropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      regionDropdownRef.current &&
      !regionDropdownRef.current.contains(event.target)
    ) {
      setIsRegionOpen(false);
    }
    if (
      comunaDropdownRef.current &&
      !comunaDropdownRef.current.contains(event.target)
    ) {
      setIsComunaOpen(false);
    }
    if (
      categoriaDropdownRef.current &&
      !categoriaDropdownRef.current.contains(event.target)
    ) {
      setIsCategoriaOpen(false);
    }
  };

  const toggleRegionDropdown = () => {
    setIsRegionOpen(!isRegionOpen);
  };

  const toggleComunaDropdown = () => {
    setIsComunaOpen(!isComunaOpen);
  };

  const toggleCategoriaDropdown = () => {
    setIsCategoriaOpen(!isCategoriaOpen);
  };

  const [currentRegion, setCurrentRegion] = useState(
    'Metropolitana de Santiago'
  );
  const [currentComunas, setCurrentComunas] = useState('');

  const loadComunas = () => {
    const index = regiones.findIndex((item) => item.region === currentRegion);
    const comunas = regiones[index].comunas;
    setCurrentComunas(comunas);
  };

  useEffect(() => {
    initTE({ Select });
  }, []);

  useEffect(() => {
    loadComunas();
  }, [currentRegion]);

  return (
    <div className="mb-[2em] p-0 sm:gap-4 container flex flex-wrap justify-center md:justify-end mt-3 md:mr-0 md:gap-x-5 md:my-4 md:bg-white py-5">
      <div className='flex gap-2 mt-2'>
        <button type="button" className="sm:hidden flex items-center mr-2">
          <FontAwesomeIcon icon={faFilter} className="text-secondary h-6" />
        </button>
        <div
          className="relative inline-block"
          ref={regionDropdownRef}
          data-te-dropdown-ref
        >
          <div className="relative inline-blockrounded-lg">
            <select
              data-te-select-init
              data-te-select-filter="true"
              onChange={(e) => {
                setCurrentRegion(e.target.value);
              }}
            >
              {regiones.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.region}
                </option>
              ))}
            </select>
            <label data-te-select-label-ref>Región</label>
          </div>
        </div>
        <div
          className="relative inline-block"
          ref={comunaDropdownRef}
          data-te-dropdown-ref
        >
          <select data-te-select-init data-te-select-filter="true">
            {currentComunas &&
              currentComunas.map((item, index) => (
                <option key={index} value={index}>
                  {item}
                </option>
              ))}
          </select>
          <label data-te-select-label-ref>Comuna</label>
        </div>
        <div
          className="relative inline-block"
          ref={categoriaDropdownRef}
          data-te-dropdown-ref
        >
          <select data-te-select-init data-te-select-filter="true">
            {categorias.map((item, index) => (
              <option key={index} value={index}>
                {item.name}
              </option>
            ))}
          </select>
          <label data-te-select-label-ref>Categoría</label>
        </div>
        <button
          type="button"
          className={`hidden sm:ml-4 md:ml-0 sm:block bg-secondary rounded lg:px-10 pb-2 pt-2.5 text-md text-white hover:bg-yellow hover:text-primary transition duration-150 ease-in-out sm:px-4`}
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default Filters;
