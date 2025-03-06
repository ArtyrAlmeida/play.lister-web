import backImage from "../../../assets/vectors/analytics-label.svg";

const AnalyticsLabel: React.FC<{ text: string }> = (props) => {
    return (
        <div>
            <h3>{props.text}</h3>
            <img src={backImage} alt="Imagem de fundo de texto" />
        </div>
    )    
}

export default AnalyticsLabel;