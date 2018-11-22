/*import React, { Component, Fragment } from 'react';
import { db,} from './../config';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import HeaderCustom from '../Projeto/HeaderCustom';
import { Container, Segment, Icon,} from 'semantic-ui-react'


class Burndown extends Component {

    constructor(props) {
        super(props)

        this.state = {
            openAndClose: false,
            estaCarregando: false,
            stories: {},
            equipeProj: {},
            scrumMasterProj: '',
            descProj: '',
            concluidas: '',
            quantStories: '',
            quantPoints:'',
            options: {},

        }

    }

    componentDidMount = () => {
        this.carregaStories(this.props.match.params.id);
    }

    carregaStories = (idProj) => {

        this.setState({
            stories: {},
            estaCarregando: true,
        })

        const projetoRef = db.ref(`projetos/${idProj}`);
        //Observador ligado pra atualizar nos outros
        projetoRef.on('value', (snapshot) => {
            let projeto = snapshot.val();
            if (projeto) {
                this.setState({
                    stories: projeto.stories,
                    descProj: projeto.descricao,
                    equipeProj: projeto.equipeProj,
                    scrumMasterProj: projeto.scrumMasterProj,
                    estaCarregando: false,
                });
            }
        });

        this.totalConcluidas();

        this.setState({
            options: {
                title: {
                  text: `Burndown Chart do projeto: ${this.props.match.params.nome}`,
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
                  text: `Nome do projeto: ${this.props.match.params.nome}`,
                  x: -20
                },
                xAxis: {
                  categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6',
                               'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12']
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
                  name: 'Ideal Burn',
                  color: 'rgba(255,0,0,0.25)',
                  lineWidth: 2,
                  data: [110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]
                }, {
                  name: 'Actual Burn',
                  color: 'rgba(0,120,200,0.75)',
                  marker: {
                    radius: 6
                  },
                  data: [100, 110, 125, 95, 64, 76, 62, 44, 35, 29, 18, 2]
                }]
              }
        })

    }

    showAndHide = () => {
        this.setState(prevState => ({
            openAndClose: !prevState.openAndClose
        }));
    }

    totalConcluidas = () => {
      const idSubmit = this.props.match.params.id;
      const storiesRef = db.ref(`projetos/${idSubmit}/stories`);

      storiesRef.on('value', (snapshot) => {
          let concluidas = 0;
          let quantStories = 0;
          let quantPoints = 0;
          let stories = snapshot.val();

          for (let key in stories) {

              quantStories += 1

              if (stories[key].situacao === 'Concluida') {
                  concluidas += 1;
              }
              
              quantPoints += stories[key].storyPoint;

          }

          this.setState({
              concluidas: concluidas,
              quantStories: quantStories,
              quantPoints: quantPoints
          });
      });


  }


    render() {
        if (this.state.estaCarregando) {
            return <p><Icon loading name='spinner' /> Carregando...</p>
        }

        return (

            <Fragment>
                <HeaderCustom />
                <Container>
                    <Segment piled>
                        <h2>Burndown Chart</h2>
                    </Segment>
                    <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.options}  
                        />
                </Container>
            </Fragment>
        )
    }
}

export default Burndown;
*/