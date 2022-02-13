import { PeriodicElement } from './../../models/PeriodicElement';
import { PeriodicElementService } from './../../services/PeriodicElement.service';
import { ElementDialogComponent } from './../../shared/element-dialog/element-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[PeriodicElementService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','actions'];
  dataSource!: PeriodicElement[];

  constructor(
    public periodicElementService: PeriodicElementService,
    public dialog: MatDialog
    ) {
      this.periodicElementService.getElements()
        .subscribe((data: PeriodicElement[] ) => {
          this.dataSource = data;
          console.log(data);
        });

     }

  ngOnInit(): void {
  }

  openDialog(element : PeriodicElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        position: null,
        name:"",
        weight:null,
        symbol: ''
      } : {
        id: element._id,
        position: element.position,
        name: element.name,
        weight: element.weight,
        symbol: element.symbol
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        if (this.dataSource.map(p => p._id).includes(result.id)) {
          this.periodicElementService.editElement(result.id, result)
            .subscribe((data: PeriodicElement) => {
              const index = this.dataSource.findIndex(p => p._id === data._id)
              this.dataSource[index] = data;
              this.table.renderRows();
              console.log('1');

            })
        } else {
          this.periodicElementService.createElements(result)
          .subscribe((data: PeriodicElement) => {
            this.dataSource.push(result);
            this.table.renderRows();
            console.log('2');

          });
        }
      }
    });
  }

  editElement(element : PeriodicElement): void {
    this.openDialog(element);

  }

  deleteElement(id: string): void{
    this.periodicElementService.deleteElement(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p._id !== id)
      })
  }


}
