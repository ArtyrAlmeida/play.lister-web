import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "../../api/playlists/getAnalytics";
import AnalyticsLabel from "../../components/Analytics/AnalyticsLabel/AnalyticsLabel";
import PieChart from "../../components/Analytics/PieChart/PieChart";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthResponse } from "../../interfaces/auth.types";

import styles from "./Analytics.module.scss";
import Loading from "../../components/Loading/Loading";
import NoContent from "../../components/NoContent/NoContent";
import { Close } from "@mui/icons-material";



const Analytics: React.FC = () => {
    const { id } = useAuthUser<AuthResponse>()!;

    const { data, isLoading, error } = useQuery({
        refetchOnWindowFocus: false,
        queryKey: [`analytics`],
        queryFn: async () => {
            return await getAnalytics(id)
        }
    });

    if (isLoading) return <div><Loading message="Carregando Analytics"/></div>
    if (error || (!isLoading && !data)) return <NoContent icon={<Close />} message="Erro ao obter métricas"  />

    return <div className={styles.page}>
        <h1>Analytics</h1>
        {data && <>
                <div className={styles.metric}>
                    <AnalyticsLabel text={`O usuário que você mais curtiu foi ${data.mostLiked.labels[0] || ""}`} />
                    <PieChart data={data.mostLiked} label="Usuário com playlist mais curtidas por você"/>
                </div>
                <div className={`${styles.metric} ${styles.inverse}`}>
                    <PieChart data={data.playlistsCreated} label="Quantidade de playlists criadas por mês"/>
                    <AnalyticsLabel text={`Você criou ${data.playlistsCreated.values.reduce((acc, curr) => acc + curr)} playlists nos últimos 3 meses`} />
                </div>
                <div className={styles.metric}>
                    <AnalyticsLabel text={`Seu artista mais ouvido é ${data.mostListened.labels[0] || ""}`} />
                    <PieChart data={data.mostListened} label="Artistas que mais aparecem nas suas playlists"/>
                </div>
            </>
        }

    </div>
        
    
}

export default Analytics;