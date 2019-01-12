import {Component, OnDestroy,  Input} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarService } from '../../@core/data/solar.service';
import { Influx } from 'influxdb-nodejs';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  @Input() menuManualMeasure= "Select ...";
  @Input() submittedManualMeasure= false;
  @Input() hide :boolean =false;

  start(state :boolean){
      if(state){
                this.hide=true;
                const Influx = require('influxdb-nodejs');
                const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                influx.write('TRS')
                  .field({
                    start: 1,
                  })
                  .then(() => console.info('write point success'))
                  .catch(console.error);
              }
      else    {
                this.hide=false;
                const Influx = require('influxdb-nodejs');
                const influx =  new Influx('http://root:root@localhost:8086/Atelier');

                influx.write('TRS')
                  .field({
                    start: 0,
                  })
                  .then(() => console.info('write point success'))
                  .catch(console.error);
                        influx.query('TRS')
                            .set({
                              limit: 1,
                              order: 'desc',
                            })
                            .addFunction('elapsed', 'start')
                            .then((start) => {
                        console.info(-start.results[0].series[0].values[0][1]/1000000000);
                        influx.write('TRS')
                          .field({
                            ProductionTime:-start.results[0].series[0].values[0][1]/1000000000
                          })
                          .then(() => console.info('write point success'))
                          .catch(console.error);
                      })
                      .catch(console.error);
              }
    }
    workAD1(state :boolean){
        if(state){

                  const Influx = require('influxdb-nodejs');
                  const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                  influx.write('TRS')
                    .field({
                      pauseAD1: 1,
                    })
                    .then(() => console.info('write point success'))
                    .catch(console.error);
                }
        else    {

                  const Influx = require('influxdb-nodejs');
                  const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                  influx.write('TRS')
                    .field({
                      pauseAD1: 0,
                    })
                    .then(() => console.info('write point success'))
                    .catch(console.error);
                    influx.query('TRS')
                        .set({
                          limit: 1,
                          order: 'desc',
                        })
                        .addFunction('elapsed', 'pauseAD1')
                        .then((pause) => {
                    console.info(-pause.results[0].series[0].values[0][1]/1000000000);
                    influx.write('TRS')
                      .field({
                        WorkTimeAD1:-pause.results[0].series[0].values[0][1]/1000000000
                      })
                      .then(() => console.info('write point success'))
                      .catch(console.error);
                  })
                  .catch(console.error);
          }
                }

                workAD2(state :boolean){
                    if(state){

                              const Influx = require('influxdb-nodejs');
                              const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                              influx.write('TRS')
                                .field({
                                  pauseAD2: 1,
                                })
                                .then(() => console.info('write point success'))
                                .catch(console.error);
                            }
                    else    {

                              const Influx = require('influxdb-nodejs');
                              const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                              influx.write('TRS')
                                .field({
                                  pauseAD2: 0,
                                })
                                .then(() => console.info('write point success'))
                                .catch(console.error);
                                influx.query('TRS')
                                    .set({
                                      limit: 1,
                                      order: 'desc',
                                    })
                                    .addFunction('elapsed', 'pauseAD2')
                                    .then((pause) => {
                                console.info(-pause.results[0].series[0].values[0][1]/1000000000);
                                influx.write('TRS')
                                  .field({
                                    WorkTimeAD2:-pause.results[0].series[0].values[0][1]/1000000000
                                  })
                                  .then(() => console.info('write point success'))
                                  .catch(console.error);
                              })
                              .catch(console.error);
                      }
                            }

                            workACD(state :boolean){
                                if(state){

                                          const Influx = require('influxdb-nodejs');
                                          const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                                          influx.write('TRS')
                                            .field({
                                              pauseACD: 1,
                                            })
                                            .then(() => console.info('write point success'))
                                            .catch(console.error);
                                        }
                                else    {

                                          const Influx = require('influxdb-nodejs');
                                          const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                                          influx.write('TRS')
                                            .field({
                                              pauseACD: 0,
                                            })
                                            .then(() => console.info('write point success'))
                                            .catch(console.error);
                                            influx.query('TRS')
                                                .set({
                                                  limit: 1,
                                                  order: 'desc',
                                                })
                                                .addFunction('elapsed', 'pauseACD')
                                                .then((pause) => {
                                            console.info(-pause.results[0].series[0].values[0][1]/1000000000);
                                            influx.write('TRS')
                                              .field({
                                                WorkTimeACD:-pause.results[0].series[0].values[0][1]/1000000000
                                              })
                                              .then(() => console.info('write point success'))
                                              .catch(console.error);
                                          })
                                          .catch(console.error);
                                  }
                                        }
                                        workACE1(state :boolean){
                                            if(state){

                                                      const Influx = require('influxdb-nodejs');
                                                      const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                                                      influx.write('TRS')
                                                        .field({
                                                          pauseACE1: 1,
                                                        })
                                                        .then(() => console.info('write point success'))
                                                        .catch(console.error);
                                                    }
                                            else    {

                                                      const Influx = require('influxdb-nodejs');
                                                      const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                                                      influx.write('TRS')
                                                        .field({
                                                          pauseACE1: 0,
                                                        })
                                                        .then(() => console.info('write point success'))
                                                        .catch(console.error);
                                                        influx.query('TRS')
                                                            .set({
                                                              limit: 1,
                                                              order: 'desc',
                                                            })
                                                            .addFunction('elapsed', 'pauseACE1')
                                                            .then((pause) => {
                                                        console.info(-pause.results[0].series[0].values[0][1]/1000000000);
                                                        influx.write('TRS')
                                                          .field({
                                                            WorkTimeACE1:-pause.results[0].series[0].values[0][1]/1000000000
                                                          })
                                                          .then(() => console.info('write point success'))
                                                          .catch(console.error);
                                                      })
                                                      .catch(console.error);
                                              }
                                                    }
                                                    workACE2(state :boolean){
                                                        if(state){

                                                                  const Influx = require('influxdb-nodejs');
                                                                  const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                                                                  influx.write('TRS')
                                                                    .field({
                                                                      pauseACE2: 1,
                                                                    })
                                                                    .then(() => console.info('write point success'))
                                                                    .catch(console.error);
                                                                }
                                                        else    {

                                                                  const Influx = require('influxdb-nodejs');
                                                                  const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                                                                  influx.write('TRS')
                                                                    .field({
                                                                      pauseACE2: 0,
                                                                    })
                                                                    .then(() => console.info('write point success'))
                                                                    .catch(console.error);
                                                                    influx.query('TRS')
                                                                        .set({
                                                                          limit: 1,
                                                                          order: 'desc',
                                                                        })
                                                                        .addFunction('elapsed', 'pauseACE2')
                                                                        .then((pause) => {
                                                                    console.info(-pause.results[0].series[0].values[0][1]/1000000000);
                                                                    influx.write('TRS')
                                                                      .field({
                                                                        WorkTimeACE2:-pause.results[0].series[0].values[0][1]/1000000000
                                                                      })
                                                                      .then(() => console.info('write point success'))
                                                                      .catch(console.error);
                                                                  })
                                                                  .catch(console.error);
                                                          }
                                                                }
                                                                workACC(state :boolean){
                                                                    if(state){

                                                                              const Influx = require('influxdb-nodejs');
                                                                              const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                                                                              influx.write('TRS')
                                                                                .field({
                                                                                  pauseACC: 1,
                                                                                })
                                                                                .then(() => console.info('write point success'))
                                                                                .catch(console.error);
                                                                            }
                                                                    else    {

                                                                              const Influx = require('influxdb-nodejs');
                                                                              const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                                                                              influx.write('TRS')
                                                                                .field({
                                                                                  pauseACC: 0,
                                                                                })
                                                                                .then(() => console.info('write point success'))
                                                                                .catch(console.error);
                                                                                influx.query('TRS')
                                                                                    .set({
                                                                                      limit: 1,
                                                                                      order: 'desc',
                                                                                    })
                                                                                    .addFunction('elapsed', 'pauseACC')
                                                                                    .then((pause) => {
                                                                                console.info(-pause.results[0].series[0].values[0][1]/1000000000);
                                                                                influx.write('TRS')
                                                                                  .field({
                                                                                    WorkTimeACC:-pause.results[0].series[0].values[0][1]/1000000000
                                                                                  })
                                                                                  .then(() => console.info('write point success'))
                                                                                  .catch(console.error);
                                                                              })
                                                                              .catch(console.error);
                                                                      }
                                                                            }


  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'secondary',
      },
    ],
  };

  constructor(private themeService: NbThemeService,
              private solarService: SolarService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
