import { Component, OnInit, HostListener, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { GridItem } from '../gridItem.interface'
import { SettingService } from '../setting.service'
import {BookedEvent} from '../bookedEvent.interface'
import { EventService } from '../event.service';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  gridColWidth = 250;

  dragActive = false;
  dragStart = {x: 0, y: 0};
  grids = [{x: 0}];
  newGrid: GridItem[][];
  sign = 0;
  n = 0;
  // position = {x: 0, y: 0};
  // velocity: number;
  // time: number;

	grid: GridItem[][];
	gridSetting: {rows: number, cols: number};
  selection: {date: Date, startTime: string, endTime: string};
  selectionRowSpan: {start: number, end: number};
  events: BookedEvent[];
  @Input() activePageCourt: {id: number, name: string};
  @Input() currentDate: Date;
  dragPosition = {x: 0, y: 0};
  dragPositionNewGrid = {x: 0, y: 0};
  constructor(private _settingService: SettingService, private _eventService: EventService) { }

  @HostListener('document:click', ['$event']) documentClick(event: MouseEvent) {
    // console.log('click: ', event);
  }

  @HostListener('document:touchstart', ['$event']) documentMD(event: MouseEvent) {
    this.dragStart = {x: event.screenX, y: event.screenY};
    this.dragActive = true;


  }

  @HostListener('document:touchmove', ['$event']) documentMM(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    if(event.buttons == 1 && event.button == 0){
      this.dragPosition = {x: event.screenX - this.dragStart.x , y: 0};

      if(event.screenX - this.dragStart.x < 0){

        if(this.sign > 0){
          this.grids.pop();
        }

        if(this.grids.length < 2){
          this.grids.push({x: 250})
        }
        this.sign = -1;

      } else {

        this.dragPosition = {x: event.screenX - this.dragStart.x, y: 0};
        if(this.sign < 0){
          this.grids.pop();
        }

        if(this.grids.length < 2){
          this.grids.push({x: -250})
        }
        this.sign = 1;
      }


    }

  }

  @HostListener('document:touchend', ['$event']) documentMU(event: MouseEvent) {
    event.stopPropagation();

    const n = ~~(Math.ceil(event.screenX - this.dragStart.x) / 150);

    if(n == 0){
      this.grids = [{x: 0}]
      this.dragPosition = {x:0, y:0};
    } else if(n < 0){
      this.grids = [{x: 0}]
      // this.grids = this.grids.slice(1,2);
      this.dragPosition = {x:0, y:0};
    } else{
      this.grids = [{x: 0}]
      // this.grids = this.grids.slice(1,2);
      this.dragPosition = {x:0, y:0};
    }
    console.log(n)


    this.sign = 0;
    this.dragActive = false;
  }

  ngOnInit(): void {
    const settings = this._settingService.getSettings();
    this.gridSetting = settings.gridSettings;
  	this.grid = this.createNewGrid( this.gridSetting.rows, this.gridSetting.cols);
    this.events = this._eventService.getEvents(this.currentDate, this.activePageCourt.id);
  }

  ngOnChanges(changes): void {
    this.reloadEvents();
  }

  reloadEvents(){
    delete this.events;
    this.events = this._eventService.getEvents(this.currentDate, this.activePageCourt.id);
  }

  deleteEvent(event){
    this._eventService.deleteEvent(event);
    this.reloadEvents();
  }

  createNewGrid(rows, cols){
  	let gridItems = [];
  	for (let row=0; row<rows; row++) {
  		gridItems[row] = [];
  		for (let col=0; col<cols; col++){
  			gridItems[row][col] = <GridItem>{row:row, col: col, selected: false, booked: false};
  		}
  	}
    return gridItems;
  }

  selectGridItem(gridItem){
    if(gridItem.selected){
      if(this.selectionRowSpan.end >= gridItem.row && gridItem.row > this.selectionRowSpan.end - 2){
        if(gridItem.row % 2 == 0){
          gridItem.selected = false;
          this.grid[gridItem.row + 1][gridItem.col].selected = false;
        } else {
          gridItem.selected = false;
          this.grid[gridItem.row - 1][gridItem.col].selected = false;
        }
        this.selectionRowSpan.end -= 2;
      } else if(this.selectionRowSpan.start <= gridItem.row && gridItem.row < this.selectionRowSpan.start + 2){
        if(gridItem.row % 2 == 0){
          gridItem.selected = false;
          this.grid[gridItem.row + 1][gridItem.col].selected = false;
        } else {
          gridItem.selected = false;
          this.grid[gridItem.row - 1][gridItem.col].selected = false;
        }
        this.selectionRowSpan.start += 2;
      }
      if(this.selectionRowSpan.start >= this.selectionRowSpan.end){
        delete this.selectionRowSpan;
      }
    } else {
      if(this.selectionRowSpan){
        if(this.selectionRowSpan.end + 2 >= gridItem.row && gridItem.row > this.selectionRowSpan.end){
          if(gridItem.row % 2 == 0){
            gridItem.selected = true;
            this.grid[gridItem.row + 1][gridItem.col].selected = true;
          } else {
            gridItem.selected = true;
            this.grid[gridItem.row - 1][gridItem.col].selected = true;
          }
          this.selectionRowSpan.end += 2;
        } else if(this.selectionRowSpan.start - 2 <= gridItem.row && gridItem.row < this.selectionRowSpan.start){
          if(gridItem.row % 2 == 0){
            gridItem.selected = true;
            this.grid[gridItem.row + 1][gridItem.col].selected = true;
          } else {
            gridItem.selected = true;
            this.grid[gridItem.row - 1][gridItem.col].selected = true;
          }
          this.selectionRowSpan.start -= 2;
        }
      } else {
        if(gridItem.row % 2 == 0){
          gridItem.selected = true;
          this.grid[gridItem.row + 1][gridItem.col].selected = true;
          this.selectionRowSpan = {start: gridItem.row, end: gridItem.row + 1};
        } else {
          gridItem.selected = true;
          this.grid[gridItem.row - 1][gridItem.col].selected = true;
          this.selectionRowSpan = {start: gridItem.row - 1, end: gridItem.row};
        }
      }
    }
    this.selection = this.setSelection(this.currentDate, this.selectionRowSpan);
  }

  setSelection(date, rowSpan){
    if(rowSpan){
      return {date: date, startTime: this.rowToTimeString(rowSpan.start), endTime: this.rowToTimeString(rowSpan.end + 1)};
    } else {
      return null;
    }
  }

  clearSelection(event){
    if(event.target.id != 'grid-item'){
      delete this.selection;
      delete this.selectionRowSpan;
      for(let gridRow of this.grid){
        for(let gridItem of gridRow){
          gridItem.selected = false;
        }
      }
    }

  }

  rowToTimeString(row){
    const tStart = 8;
    const tInc = 0.25;
    const t = tStart + tInc*row;
    const h = (~~(t/1)).toString();
    let m: string;
    if(t%1 == 0){
      m = '00';
    } else {
      m = (60*(t%1)).toString();
    }
    return h + ':' + m;
  }

}
