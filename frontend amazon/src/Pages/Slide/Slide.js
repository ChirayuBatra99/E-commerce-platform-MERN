import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Divider } from '@mui/material';
import { products } from './productdata';
import styles from './Slide.module.scss'

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


function Slide() {
    return (
        <div className='product-sectin'>
            <div className='products-dea'>
                <h3>Deal of the day</h3>
                <button className="btn btn-primary">Priaamary</button>
                {console.log("hemlo", products)}
                <Divider />

                <Carousel
                className={styles.container}
                    infinite={true}
                    responsive={responsive}
                    draggable={false}
                    swipeable={true}
                    showDots={false}
                    centerMode={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    containerClass="carousel-container"
                >
                   {products.map((e)=> (

                            // <NavLink to=
                            <div className={styles.productsitems}>
                                <div className={styles.product_img}>
                                    <img src={e.url} alt="product"/>
                                </div>
                                <p className='products_name'>{e.title.shortTitle}</p>
                                <p className='products_offer'>{e.discount}</p>
                                <p className='products_explore'>{e.tagline}</p>
                            </div>
                ))  }



                </Carousel>
               </div>
        </div>
    )
}

export default Slide
