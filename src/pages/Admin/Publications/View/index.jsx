import { useParams } from 'react-router-dom';

const ViewOne = () => {
  const { slug } = useParams();

  return (
      <div className="container py-5">
        <h1 className="text-2xl mb-10 font-bold">Noticia: {slug} </h1>
      </div>
  );
};

export default ViewOne;
