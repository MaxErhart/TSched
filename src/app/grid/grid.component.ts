import { Component, OnInit } from '@angular/core';
import { GridItem } from '../gridItem.interface'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

	grid: GridItem[][];
	gridSetting = {rows: 48, cols: 1};
  constructor() { }

  ngOnInit(): void {
  	this.grid = this.createNewGrid( this.gridSetting.rows, this.gridSetting.cols);
    console.log(this.grid)
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

}
