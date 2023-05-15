import { useParams } from 'react-router-dom';

const EditOne = () => {
  const { slug } = useParams();

  return (
      <div className="container py-5">
        <h1 className="text-2xl mb-10 font-bold">Editar Noticia: {slug}</h1>
      </div>
  );
};

export default EditOne;
