

const TableOne = () => {
  return (
    <div className="rounded-md border border-gray-50 bg-white px-5 pt-6 pb-2.5 text-primary shadow-xl sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top 5 de noticias de la semana
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-blue-50 sm:grid-cols-3">
          <div className="p-2 xl:p-5">
            <h5 className="text-sm font-medium uppercase">
              Lugar
            </h5>
          </div>
          <div className="p-2 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase">
              Noticia
            </h5>
          </div>
          <div className="p-2 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase">
            Nº de visitas
            </h5>
          </div>
        </div>

        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark hover:bg-gray-100 sm:grid-cols-3">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
                1º
            </div>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white truncate overflow-ellipsis">La carrera contra el tiempo de los científicos para salvar a la ranita de Darwin</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-meta-3">1000</p>
          </div>
        </div>

        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-3 hover:bg-gray-100">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
              2º
            </div>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white truncate overflow-ellipsis">Inteligencia artificial en las escuelas: del miedo inicial a las ideas innovadoras de hoy</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">960</p>
          </div>
        </div>

        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-3 hover:bg-gray-100">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
                3º
            </div>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white truncate overflow-ellipsis">Del vertedero al hilado: Ecocitex busca cambiar el destino final de los desechos textiles</p>
          </div>
          
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">820</p>
          </div>
        </div>

        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-3 hover:bg-gray-100">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
              4º
            </div>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white truncate overflow-ellipsis ">Familia chilota gana Premio Los Creadores 2022 con módulo automatizado para mejorar la germinación de semillas</p>
          </div>
          
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">780</p>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 hover:bg-gray-100">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
                5º
            </div>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white truncate overflow-ellipsis">Así avanza el ambicioso proyecto que restaura zonas del sur afectadas por incendios forestales</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">600</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOne;
