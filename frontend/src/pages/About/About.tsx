import styles from './About.module.scss';
import { Marker, useJsApiLoader } from '@react-google-maps/api';
import { GoogleMap } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px',
}

const center = {
    lat: -6.889422534851155,
    lng: -38.54531892360271,
}

function About() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: '<Get an api Key>',
    })

    return (
        <>
            <div className={styles['about-container']}>
                <h1 className={styles['about-tittle']}>Sobre a Play.lister</h1>
                <section className={styles['info-section']}>
                    <p className={styles['info-item-description']}>A mais de 20 anos trazendo diversidade e inclusão além de um ambiente que faz você se sentir em casa.</p>
                    <div className={styles['info-item-image-display']}>
                        <h2 className={styles['info-item-tittle']}>Nossos Valores</h2>
                        <div className={styles['info-item-image']}></div>
                    </div>
                </section>
                <section className={styles['info-section']}>
                    <div className={styles['info-item-image-display']}>
                        <h2 className={styles['info-item-tittle']}>Nossa Missão</h2>
                    </div>
                    <p className={styles['info-item-description']}>A mais de 20 anos trazendo diversidade e inclusão além de um ambiente que faz você se sentir em casa.</p>
                </section>
                <section className={styles['info-section']}>
                    <p className={styles['info-item-description']}>A mais de 20 anos trazendo diversidade e inclusão além de um ambiente que faz você se sentir em casa.</p>
                    <div className={styles['info-item-image-display']}>
                        <h2 className={styles['info-item-tittle']}>Nossa Equipe</h2>
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
                                zoom={90}
                            >
                                {
                                    <Marker position={center} label={"IFPB - Campus Cajazeiras"} />
                                }
                                <></>
                            </GoogleMap>
                        ) : (
                            <></>
                        )
                    }
                    <h3>Cajazeiras - PB</h3>
                </section>
            </div>
        </>
    );
}

export default About;