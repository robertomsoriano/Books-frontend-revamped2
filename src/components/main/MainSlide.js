import React, {useState} from "react";
import { Carousel, Button} from 'react-bootstrap';
import teologiaFamilia from '../../images/teologiaFamilia.jpg'
import oracionJabes from '../../images/oracionJabes.jpg'

export default function MainSlide() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
    <div style={styles}>
    <Carousel activeIndex={index} direction={direction} onSelect={handleSelect} >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={teologiaFamilia}
          alt="First slide"
        />
        <Carousel.Caption>
          <Button>Order Now</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={oracionJabes}
          alt="First slide"
        />
        <Carousel.Caption>
          <Button>Order Now</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}


const styles = {
  // padding: '0px 10px 10px 0px',
  margin: '0 0 0 0'
}