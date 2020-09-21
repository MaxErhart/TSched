import { Component, HostListener, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import Swiper from 'swiper'
import {PaginatorComponent} from './paginator/paginator.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TSched';
  user = {name: 'Default User'};
  performance: any;
  prevDate: Date;
  currDate: Date;
  nextDate: Date;
  activeGrid = 1;
  @ViewChild('paginator') paginator: PaginatorComponent;

  ngAfterViewInit(){

    const e = (e) => {
      this.paginator.pageChange(e);
    }

    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      initialSlide: 1,
    });

    swiper.on('slideChangeTransitionEnd', function (event) {
      if(event.realIndex != 1){
        if(event.realIndex == 0){
          e(-1);
        } else {
          e(1);
        }
      }

      swiper.slideTo(1, 0, true);


    })
  }



  logout(){
    delete this.user;
  }
  login(user){
    this.user = user;
  }

  changeDate(date, change){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + change)
  }


}
