import { useEffect, useState } from 'react';
import PublicationCard from './PublicationCard';

const ListMobile = ({ publications, setSelectedItems, clearSelection }) => {
  const [ forceRender, setForceRender ] = useState(false)
  useEffect(() => {
    setForceRender(!forceRender)
  }, [clearSelection])
  
  const handleSelect = (publication, isSelected) => {
    if (!isSelected) {
      return setSelectedItems((prevState) => {
        return prevState.filter((item) => item.id !== publication.id);
      });
    }
    return setSelectedItems((prevState) => [...prevState, publication]);
  };
    
  return (
    <div className="grid columns-1 gap-3 min-h-[480px]"
      key={forceRender ? 'render-key-1': 'render-key-2' }
    >
      {publications?.map((publication) => (
        <PublicationCard
          key={`card-mobile-${publication.id}`}
          publication={publication}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default ListMobile;
