import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
    return (
        <div className='home'>
            <div className='home__container'>
                <img className='home__image' 
                    src='amazon-video.jpg' 
                    alt='' 
                />

                <div className='home__row'>
                    <Product 
                        id='1'
                        title="Life's Amazing Secrets: How to Find Balance and Purpose in Your Life" 
                        price ={206} image = 'book.jpg' 
                    />

                    <Product 
                        id='2'
                        title="Panasonic 1 Ton 5 Star Wi-Fi Inverter Smart Split AC" 
                        price ={38_900} image = 'ac.jpg'
                    />
                </div>

                <div className='home__row'>
                    <Product 
                        id='3'
                        title="boAt Nirvana Ion Truly Wireless in Ear Buds (Charcoal Black)" 
                        price ={1_699} image = 'boat.jpg' 
                    />
                    
                    <Product 
                        id='4'
                        title="LG 322 L 4 Star Smart Inverter Double Door Refrigerator" 
                        price ={37_900} image = 'fridge.jpg' 
                    />

                    <Product 
                        id='5'
                        title="Apple iPhone 15 Pro Max (256 GB) - Black Titanium" 
                        price ={1_40_999} image = "phone.jpg" 
                    />
                </div>

                <div className='home__row'>
                    <Product 
                        id='6'
                        title="Sony PlayStation®5 Console (slim)" 
                        price ={54_990} image = 'ps5.jpg' />
                </div>
            </div>
        </div>
    )
}

export default Home
