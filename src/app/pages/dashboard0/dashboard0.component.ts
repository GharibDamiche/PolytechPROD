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
  selector: 'ngx-dashboard0',
  styleUrls: ['./dashboard0.component.scss'],
  templateUrl: './dashboard0.component.html',
})
export class DashboardComponent0 implements OnDestroy {

  @Input() menuManualMeasure= "Select ...";
  @Input() submittedManualMeasure= false;
  @Input() startop1 :boolean =false;
  @Input() startop2 :boolean =false;
  @Input() startop3 :boolean =false;
  @Input() startop4 :boolean =false;
  start;
  stop;
  startOp1(state :boolean){
      if(state){
                this.startop1=true;
                const Influx = require('influxdb-nodejs');
                const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                influx.write('OP1')
                  .field({
                    start: 1,
                  })
                  .then(() => console.info('write point success'))
                  .catch(console.error);
              }
      else    {
                this.startop1=false;
                const Influx = require('influxdb-nodejs');
                const influx =  new Influx('http://root:root@localhost:8086/Atelier');

                influx.write('OP1')
                  .field({
                    start: 0,
                    pause:0,
                  })
                  .then(() => console.info('write point success'))
                  .catch(console.error);
                        influx.query('OP1')
                            .set({
                              limit: 1,
                              order: 'desc',
                            })
                            .addFunction('elapsed', 'start')
                            .then((start) => {
                        console.info(-start.results[0].series[0].values[0][1]/1000000000);
                        influx.write('OP1')
                          .field({
                            utile:-start.results[0].series[0].values[0][1]/1000000000
                          })
                          .then(() => console.info('write point success'))
                          .catch(console.error);
                      })
                      .catch(console.error);
              }
    }
    workOp1(state :boolean){
        if(state){

                  const Influx = require('influxdb-nodejs');
                  const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                  influx.write('OP1')
                    .field({
                      pause: 1,
                    })
                    .then(() => console.info('write point success'))
                    .catch(console.error);
                }
        else    {

                  const Influx = require('influxdb-nodejs');
                  const influx =  new Influx('http://root:root@localhost:8086/Atelier');
                  influx.write('OP1')
                    .field({
                      pause: 0,
                    })
                    .then(() => console.info('write point success'))
                    .catch(console.error);
                    influx.query('OP1')
                        .set({
                          limit: 1,
                          order: 'desc',
                        })
                        .addFunction('elapsed', 'pause')
                        .then((pause) => {
                    console.info(-pause.results[0].series[0].values[0][1]/1000000000);
                    influx.write('OP1')
                      .field({
                        utile:-pause.results[0].series[0].values[0][1]/1000000000
                      })
                      .then(() => console.info('write point success'))
                      .catch(console.error);
                  })
                  .catch(console.error);
          }
                }

      startOp2(state :boolean){
          if(state){var value=1;
          this.startop2=true;}
          else{var value=0;
          this.startop2=false;}
        }
        workOp2(state :boolean){
            if(state){var value=1;
            }
            else{var value=0;
            }
          }

          startOp3(state :boolean){
              if(state){var value=1;
              this.startop3=true;}
              else{var value=0;
              this.startop3=false;}
            }
            workOp3(state :boolean){
                if(state){var value=1;
                }
                else{var value=0;
                }
              }
              startOp4(state :boolean){
                  if(state){var value=1;
                  this.startop4=true;}
                  else{var value=0;
                  this.startop4=false;}
                }
                workOp4(state :boolean){
                    if(state){var value=1;
                    }
                    else{var value=0;
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
