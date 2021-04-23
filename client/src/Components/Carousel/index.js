import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import Photo1 from '../../assets/images/2017-08-15_23-12-02_064.jpeg'
import Photo2 from '../../assets/images/2019-08-07_13-51-07_917.jpg'
import Photo3 from '../../assets/images/2017-08-11_11-25-15_708.jpeg';

const items = [
  {
    src: Photo1,
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header',
    key: '1'
  },
  {
    src: Photo2,
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header',
    key: '2'
  },
  {
    src: Photo3,
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header',
    key: '3'
  }
];

const Slideshow = () => <UncontrolledCarousel items={items} />;

export default Slideshow;