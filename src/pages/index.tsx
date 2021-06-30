/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
import Head from 'next/head';
import {Line} from 'react-chartjs-2';

import { api } from '../services/api';

import styles from '../styles/Home.module.scss';

type ResponseDataProps = {
    position: number[];
    label: string[];
}

type HomeProps = ResponseDataProps;

type DataProps = {
    id: number;
    data_hora: string;
    cliente: {
        id: number;
        data_cadastro: string;
        nome: string;
        email: string;
    };
    valores: {
        ref_veloc: number;
        veloc_motor: number;
        status_inv_read: number;
        status_inv_wirite: number;
        veloc_vento: number;
        cod_falha_inv: number;
        cod_alarme_inv: number;
        corrente_motor: number;
        modo_funcionamento_tracker: number;
        tensao_motor: number;
        posicao_tracker: number;
    }
}

function Home({position, label}: HomeProps) {

    const data = {
        labels: label,
        datasets: [{
            label: 'Posição do Tracker',
            data: position,
            backgroundColor: 'rgba(0, 74, 157, 0.3)',
            borderColor: 'rgba(0, 74, 157, 0.6)',
            borderWidth: 1,
            fill: true,
            pointHoverBorderWidth: 10,
            pointRadius: 4,
        }]
    }
    
    return (
        <>
            <Head>
                <title>MVC - Silas</title>
                <meta name="description" content="MVC - Silas" />
            </Head>
            <div className={styles.container}>
                <header>
                    <nav className={styles.nav}>
                        <div className={styles.user}>
                            <span className="nome-usuario"></span>
                            <img src="/usuario.svg" alt="Imagem do usuário" />
                        </div>
                    </nav>
                </header>
                <main>
                    <div className={styles.row}>
                        <div className={styles.chart}>
                            <Line
                                type=""
                                data={data}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    animations: {
                                        tension: {
                                            duration: 1000,
                                            easing: 'linear',
                                            from: 1,
                                            to: 0,
                                            loop: false
                                        }
                                    },
                                    scales: {
                                        // y: {
                                        //   max: 50,
                                        //   min: -50,
                                        // }
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.botoes}>
                        <button type="button">
                            <div className={styles.icone}>
                                <i className="far fa-windsock"></i>
                            </div>
                            <span>Velocidade do vento</span>
                        </button>
                        <button type="button">
                            <div className={styles.icone}>
                                <i className="far fa-bolt"></i>
                            </div>
                            
                            <span>Corrente do motor</span>
                        </button>
                        <button type="button">
                            <div className={styles.icone}>
                                <i className="far fa-sensor"></i>
                            </div>
                            <span>Status do inversor</span>
                        </button>
                        <button type="button">
                            <div className={styles.icone}>
                                <i className="far fa-sensor-alert"></i>
                            </div>
                            <span>Alarme/Falha inversor</span>
                        </button>
                        <button type="button">
                            <div className={styles.icone}>
                                <i className="far fa-solar-panel"></i>
                            </div>                        
                            <span>Modo Operação Tracker</span>
                        </button>
                    </div>
                </main>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    var responseData = {position: [], label: []} as ResponseDataProps;
    const { data } = await api.post('listar', {
        chave: "PJ21_06_de4124b2749cb2ff070dd4c2b937a6bc",
        id_cliente: 1,
        where: {
            data_inicial: "2021-06-23 00:00:00",
            data_final: "2021-06-23 23:59:59",
            limit: {
                start: 0,
                end: 24,
            }
        }
    });

    data.map((value: DataProps) => {
        const tracker_position = Number( (value.valores.posicao_tracker / 100) - 90 );
        const hora = new Date( value.data_hora ).toLocaleString('pt-BR', {hour: "2-digit", minute: "2-digit"})

        responseData.position.push(tracker_position);    
        responseData.label.push(hora);
    });

    return {
        props: {
            position: responseData.position,
            label: responseData.label,
        },
        revalidate: 60 * 60 * 24,
    }
}

export default Home;