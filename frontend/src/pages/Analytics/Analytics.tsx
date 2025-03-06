import AnalyticsLabel from "../../components/Analytics/AnalyticsLabel/AnalyticsLabel";
import PieChart from "../../components/Analytics/PieChart/PieChart";


const Analytics: React.FC = () => {
    return (
        <>
            <div>
                <AnalyticsLabel text={`O usuário que você mais curtiu foi ${"X"}`} />
            </div>
            <div>
                <AnalyticsLabel text={`Você criou ${"X"} playlists nos últimos 3 meses`} />
            </div>
            <div>
                <AnalyticsLabel text={`Seu artista mais ouvido é ${"Beatles"}`} />
                <PieChart labels={['Beatles', 'Angra', 'Gojira']} data={[12, 19, 3]}/>
            </div>
        </>
    )
}

export default Analytics;