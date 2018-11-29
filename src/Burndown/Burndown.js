import React, { Component, Fragment } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import * as moment from 'moment';
import 'moment/locale/pt-br';

import HeaderCustom from '../Projeto/HeaderCustom';
import { db } from '../config'


class Burndown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            stories: {},
            descProj: '',
            dataInicioProj: '',
            dataFimProj: '',
            totalSprintEstimativa: 100,
            duracaoDiasIdeal: 0,
            quantStories: '',
            quantPoints: '',
            quantPointsIdealPorDia: 0,
        }

    }

    componentDidMount = () => {
        this.carregaStories(this.props.match.params.id);
    }

    carregaStories = (idProj) => {

        this.setState({
            estaCarregando: true,
        })

        const projetoRef = db.ref(`projetos/${idProj}`);
        //Observador ligado pra atualizar nos outros
        projetoRef.on('value', (snapshot) => {
            let projeto = snapshot.val();
            if (projeto) {
                let dataInicio = projeto.dataInicioPrevista;
                dataInicio = moment(dataInicio).format('L');
                //console.log('Data Inicio: ', dataInicio);
                let dataFim = projeto.dataFimPrevista;
                dataFim = moment(dataFim).format('L');
                //console.log('Data FimIdeal: ', dataFim);
                let start_date = moment(dataInicio, 'DD-MM-YYYY');
                let end_date = moment(dataFim, 'DD-MM-YYYY');
                let duracao = moment.duration(end_date.diff(start_date));
                let duracaoDiasIdeal = duracao.asDays();
                //console.log('duração ideal: ', duracaoDiasIdeal);
                //let dif = dataFim.diff(dataInicio, 'days')
                //console.log(dif);

                this.setState({
                    stories: projeto.stories,
                    dataInicioProj: dataInicio,
                    dataFimProj: dataFim,
                    duracaoDiasIdeal: duracaoDiasIdeal + 1,
                    estaCarregando: false,
                });
            }
        });

        this.totalConcluidas();
    }

    totalConcluidas = () => {
        const idSubmit = this.props.match.params.id;
        const storiesRef = db.ref(`projetos/${idSubmit}/stories`);

        storiesRef.on('value', (snapshot) => {
            let stories = snapshot.val();
            let concluidas = 0;
            let quantStories = 0;
            let quantPoints = 0;
            let quantPointsConcluidos = 0;
            //const atual = [];

            for (let key in stories) {

                quantStories += 1

                if (stories[key].situacao === 'Concluida' && stories[key].dataFimReal) {
                    // Colocando data inicio no formato do moment local
                    let dataInicio = stories[key].dataInicio;
                    dataInicio = moment(dataInicio).format('L');
                    console.log('Data Inicio: ', dataInicio);
                    
                    //Data Fim Real já vem no formato do moment local
                    let dataFimReal = stories[key].dataFimReal;
                    let dataFimIdealFormatada = moment(stories[key].dataFim).format('L');
                    console.log('Data FimIdeal: ', dataFimIdealFormatada);
                    console.log('Data FimReal: ', dataFimReal);
                    
                    //Duração REAL
                    let start_date = moment(dataInicio, 'DD-MM-YYYY');
                    let end_date = moment(dataFimReal, 'DD-MM-YYYY');
                    let duracaoReal = moment.duration(end_date.diff(start_date));
                    let duracaoDiasReal = duracaoReal.asDays();
                    console.log('Duração Real: ',duracaoDiasReal);
                    console.log('Dia do término Real foi no dia: ',  duracaoDiasReal+1)

                    //Duração IDEAL
                    let start_date_ideal = moment(dataInicio, 'DD-MM-YYYY');
                    let end_date_ideal = moment(dataFimIdealFormatada, 'DD-MM-YYYY');
                    let duracaoIdeal = moment.duration(end_date_ideal.diff(start_date_ideal));
                    let duracaoDiasIdeal = duracaoIdeal.asDays();
                    console.log('Duração Ideal: ',duracaoDiasIdeal);
                    console.log('Dia do término Ideal é no dia: ',  duracaoDiasIdeal+1)
                    
                    
                    
                    
                    concluidas += 1;
                    quantPointsConcluidos += parseInt(`0${stories[key].storyPoint}`, 10);
                }

                quantPoints += parseInt(`0${stories[key].storyPoint}`, 10);

            }

            this.setState({
                quantPointsConcluidos: quantPointsConcluidos,
                quantConcluidas: concluidas,
                quantStories: quantStories,
                quantPoints: quantPoints
            });
        });


    }

    linhaIdeal = () => {

        const options = {
            title: {
                text: `Burndown Chart do ${this.props.match.params.nome}`,
                x: -20 //center
            },
            colors: ['blue', 'red'],
            plotOptions: {
                line: {
                    lineWidth: 3
                },
                tooltip: {
                    hideDelay: 200
                }
            },
            subtitle: {
                text: `Data Início: ${this.state.dataInicioProj} - Data Fim: ${this.state.dataFimProj}`,
                x: -20
            },
            xAxis: {
                title: {
                    text: 'Dias'
                },
                categories: (() => {
                    const dias = [];
                    let duracaoDias = this.state.duracaoDiasIdeal
                    let idealDias = 0;
                    for (let i = 0; i <= duracaoDias - 1; i++) {
                        idealDias = idealDias + 1
                        dias.push('Dia ' + idealDias);
                    }
                    return dias;
                }
                    //data: [110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
                )()
            },
            yAxis: {
                title: {
                    text: 'Pontos'
                },
                plotLines: [{
                    value: 0,
                    width: 1
                }]
            },
            tooltip: {
                valueSuffix: ' pts',
                crosshairs: true,
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Linha Ideal',
                color: 'rgba(255,0,0,0.25)',
                lineWidth: 2,
                data: (() => {
                    const ideal = [];
                    //let totalSprintEstimativa = this.inserirdados.value.idpontos;
                    //let totalDias = this.inserirdados.value.iddias;
                    let idealIncrement = this.state.totalSprintEstimativa / this.state.duracaoDiasIdeal;
                    for (let i = 1; i <= this.state.duracaoDiasIdeal; i++) {
                        ideal.push(idealIncrement * i);
                    }
                    return ideal.reverse();
                }
                    //data: [110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
                )()
            }, {
                name: 'Linha Atual',
                color: 'rgba(0,120,200,0.75)',
                marker: {
                    radius: 6
                },
                data: [100, 110, 125, 95, 64, 76, 62, 44, 35, 29, 18, 2]
            }]
        }

        return options;
        //[100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
    }

    render() {
        return (
            <Fragment>
                <HeaderCustom />
                <Container textAlign='center'>
                    <HighchartsReact
                        highcharts={Highcharts}
                        constructorType={'chart'}
                        options={this.linhaIdeal()}
                    />
                    <Segment>Quantidade de Pontos ideias por dia: {this.state.totalSprintEstimativa / this.state.duracaoDiasIdeal}</Segment>
                </Container>
            </Fragment>
        );
    }
}

export default Burndown;