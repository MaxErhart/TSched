import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TSched';
  user = {name: 'Max Erhart'}

  logout(){
    delete this.user;
  }
  // @HostListener('document:mousedown', ['$event']) documentMD(event: MouseEvent) {
  //   this.dragStart = {x: event.screenX, y: event.screenY};
  //   this.dragActive = true;

  // }

  // @HostListener('document:mousemove', ['$event']) documentMM(event: MouseEvent) {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   if(event.buttons == 1 && event.button == 0){
  //     if(event.screenX - this.dragStart.x < 0){
  //       this.dragPosition = {x: -this.dragStart.x + event.screenX, y: 0};
  //     } else {
  //       this.dragPosition = {x: -this.dragStart.x + event.screenX, y: 0};
  //     }
  //   }
  // }

  // @HostListener('document:mouseup', ['$event']) documentMU(event: MouseEvent) {
  //   event.stopPropagation();
  //   if(event.screenX - this.dragStart.x < -150){
  //     this.dragPosition = {x: -250, y: 0};
  //   } else if(event.screenX - this.dragStart.x > 150){
  //     this.dragPosition = {x: 250, y: 0};
  //   } else {
  //     this.dragPosition = {x: 0, y: 0};
  //   }
  //   this.dragActive = false;
  // }

}
