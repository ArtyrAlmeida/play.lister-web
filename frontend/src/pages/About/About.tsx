import styles from './About.module.scss';
import { Marker, useJsApiLoader } from '@react-google-maps/api';
import { GoogleMap } from '@react-google-maps/api';

const containerStyle = {
    width: '80vw',
    height: '600px',
}

const center = {
    lat: -6.889422534851155,
    lng: -38.54531892360271,
}

function About() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCFTXib9WDhbwMrnO2fV1moU4VPyUjxBkg',
    })

    return (
        <div id={styles['background']}>
            <div id={styles['about-container']}>
            <section id={styles['upper-page-section']}>
                <h1 className={styles['about-tittle'] }>Sobre a Play.lister</h1>

                    <section className={`${styles['info-section']} ${styles['info-section-reverse']} `}>
                        <p className={styles['info-item-description']}>A mais de 20 anos trazendo diversidade e inclusão além de um ambiente que faz você se sentir em casa.</p>
                        <div className={styles['info-item-image-display']}>
                            <h2 className={styles['info-item-tittle']}>Nossos Valores</h2>
                            <img src='https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className={styles['info-item-image']}/>
                        </div>
                    </section>
                <section className={styles['info-section']}>
                    <div className={styles['info-item-image-display']}>
                        <h2 className={styles['info-item-tittle']}>Nossa Missão</h2>
                         <img src='https://images.unsplash.com/photo-1614247912229-26a7e2114c0a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className={styles['info-item-image']}/>
                    </div>
                    <p className={styles['info-item-description']}>Fazer com que gostos musicais diferentes se encontrem e sejam compartilhados, espalhando sempre a diversidade e 
                        comunidade entre os usuários
                    </p>
                </section>
                </section>
                <section id={styles['lower-page-section']}>
                    <section className={`${styles['info-section']} ${styles['info-section-reverse']}`}>
                        <p className={styles['info-item-description']}>Nossa equipe atualmente é composta por mais de 100 membros, espalhados por todo o globo!</p>
                        <div className={styles['info-item-image-display']}>
                            <h2 className={styles['info-item-tittle']}>Nossa Equipe</h2>
                            <img src='https://images.unsplash.com/photo-1548705085-101177834f47?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className={styles['info-item-image']}/>
                        </div>
                    </section>
                    <section className={styles['impact-text']}>
                        <p className={styles['impact-item-description']}>
                            Sempre Dispostos a compartilhar o que tem de melhor quando o assunto é música!
                        </p>
                    </section>
                <section className={styles['location-info']}>
                    <h2 className={styles['info-item-tittle']}>Localização</h2>
                    {
                        isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={17}
                            >
                                {
                                    <Marker position={center}/>
                                }
                                <></>
                            </GoogleMap>
                        ) : (
                            <></>
                        )
                    }
                    <h3>Cajazeiras - PB</h3>
                </section>
                </section>
            </div>
        </div>
    );
}

export default About;