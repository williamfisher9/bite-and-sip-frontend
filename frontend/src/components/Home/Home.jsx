import { useEffect } from 'react'
import heroImg from '../../assets/139180-food-plate-fish-download-hd.png'
import './Home.css'
import MenuCategories from '../MenuCategories/MenuCategories'

const Home = () => {
    useEffect(() => {

    }, [])

    return <div className=''>
        <div className="hero-section-wrapper">
                <div className="hero-section-container">
                    <img src={heroImg} alt='hero-img' id='hero-img' />
                    <div className='hero-img-text'>
                        <p style={{fontSize: "40px"}}>Pick & order your favorite food</p>
                        <p style={{marginTop: "5px"}}>Our menu offers a diverse selection of delectable dishes, each <br />crafted to perfection. Choose your favorite and prepare to be enchanted!</p>
                        <p style={{marginTop: "10px"}}></p>
                        <button className='view-menu-btn'>View Menu</button>
                    </div>
                </div>
            </div>

            <MenuCategories />
    </div>
}

export default Home;