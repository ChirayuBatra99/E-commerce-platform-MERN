import React from 'react'
import Carousel from 'react-material-ui-carousel'
import styles from './Banner.module.scss'

const data=[
    "https://images-eu.ssl-images-amazon.com/images/G/31/Events/img23/Jupiter23/Homepage/Phase3/J23_P3B_PC_Hero_2x._CB575523010_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/PB/Oct/Jupiter23/Kitchen/GamingAcc_DesktopHero_3000x1200_bnk2._CB573736648_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/HPC/Jupiter/Phase3/GW/Hero_P3B_HHS_PC_3000x1200._CB573772793_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG23/Ayushi/updated/new/LPE_Sony_Samsung_Homepage_DesktopHeroTemplate_3000x1200_22June2023_b._CB573744144_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Fashion/Event/Gateway/Jup/Phase3/Hero/B/12-3000._CB573739358_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Xiaomi/Jup_23/Phase3/GW/12C/updated/D101997469_INWLD_Redmi12C_Jup23_Phase3_PC_Hero_3000x1200._CB573760711_.jpg",
]

function Banner() {

 
  return (
    <div  >
        <Carousel 
        className={styles.carasol}
        indicators={false}
        autoPlay={true}
        animation='slide'
        cycleNavigation={true}
        navButtonsAlwaysVisible={true}
        navButtonsProps={{
            style: {
                backgroundColor: "#fff",
                color: "#494949",
                borderRadius: 0,
                marginTop: -22,
                height: "100px",
                opacity: 0.5,
            }
        }}>
            
            {data.map((item, i) => (
          <img src={item} alt="img" className={styles.banner_img}  key={i}  />
            ))}
        </Carousel>
        
    </div>
  )
}

export default Banner
