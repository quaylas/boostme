import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import Photo1 from '../../assets/images/2017-08-15_23-12-02_064.jpeg'
import Photo2 from '../../assets/images/2019-08-07_13-51-07_917.jpg'
import Photo3 from '../../assets/images/2017-08-15_23-11-34_491.jpeg'
import Photo4 from '../../assets/images/2017-08-12_13-43-28_493 (1).jpeg'

const items = [
  {
    src: Photo1,
    altText: 'Slide 1',
    key: '1'
  },
  {
    src: Photo2,
    altText: 'Slide 2',
    key: '2'
  },
  {
    src: Photo3,
    altText: 'Slide 3',
    key: '3'
  },
  {
    src: Photo4,
    altText: 'Slide 4',
    key: '4'
  }
];

const Slideshow = () => <UncontrolledCarousel items={items} />;

export default Slideshow;