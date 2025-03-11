import backImage from "../../../assets/vectors/analytics-label.svg";

import styles from "./AnalyticsLabel.module.scss"

const AnalyticsLabel: React.FC<{ text: string }> = (props) => {
    return (
        <div className={styles["metric-label"]}>
            <h3>{props.text}</h3>
            <img src={backImage} alt="Imagem de fundo de texto" />
        </div>
    )    
}

export default AnalyticsLabel;