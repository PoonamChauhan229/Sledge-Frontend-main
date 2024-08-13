import React, { useState, useEffect, useRef } from 'react';

interface CarouselProps {
  items: JSX.Element[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [carouselItems, setCarouselItems] = useState<JSX.Element[]>([...items]);
  const galleryContainerRef = useRef<HTMLDivElement>(null);

  const updateGallery = () => {
    carouselItems.forEach((el, index) => {
      const itemIndex = index < 5 ? index + 1 : index - 4;
      if (el instanceof HTMLElement) {
        const itemClass = `gallery-item gallery-item-${itemIndex}`;
        el.className = itemClass;
      }
    });
  };

  const setCurrentState = (direction: string) => {
    if (direction === 'previous') {
      setCarouselItems((prevItems) => {
        const newItems = [...prevItems];
        newItems.unshift(newItems.pop()!);
        return newItems;
      });
    } else {
      setCarouselItems((prevItems) => {
        const newItems = [...prevItems];
        newItems.push(newItems.shift()!);
        return newItems;
      });
    }
  };

  const setControls = () => {
    const galleryControlsContainer = galleryContainerRef.current?.querySelector('.gallery-controls');
    if (galleryControlsContainer && galleryControlsContainer.children.length === 0) {
      const leftArrow = document.createElement('button');
      leftArrow.className = 'gallery-controls-previous';
      leftArrow.addEventListener('click', () => setCurrentState('previous'));

      const rightArrow = document.createElement('button');
      rightArrow.className = 'gallery-controls-next';
      rightArrow.addEventListener('click', () => setCurrentState('next'));

      galleryControlsContainer?.appendChild(leftArrow);
      galleryControlsContainer?.appendChild(rightArrow);
    }
  };

  useEffect(() => {
    setControls();
  }, []); // Call setControls only once when the component mounts

  useEffect(() => {
    updateGallery();
  }, [carouselItems]);

  return (
    <div className="gallery" ref={galleryContainerRef}>
      <div className="gallery-container">
        {carouselItems.map((item, index) => (
          <div key={index} className={`gallery-item gallery-item-${index + 1}`}>
            {item}
          </div>
        ))}
      </div>
      <div className="gallery-controls"></div>
    </div>
  );
};

export default Carousel;