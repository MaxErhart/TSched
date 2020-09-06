import { Component, OnInit, HostListener, Input, OnChanges } from '@angular/core';
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


	grid: GridItem[][];
	gridSetting: {rows: number, cols: number};
  selection: {date: Date, startTime: string, endTime: string};
  selectionRowSpan: {start: number, end: number};
  events: BookedEvent[];
  @Input() activePageCourt: {id: number, name: string};
  @Input() currentDate: Date;
  constructor(private _settingService: SettingService, private _eventService: EventService) { }

  @HostListener('document:click', ['$event']) documentClick(event: MouseEvent) {
    // if(event.target.id != 'grid-item'){
    //   this.clearSelection();
    // }
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
