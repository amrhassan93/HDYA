import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  url="../../../assets/images/login.jpg"
  isdisplayed = false


  
  toggledispayed(){
    this.isdisplayed = !this.isdisplayed
  }
  selectfile(event:any){
    if (event.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
        reader.onload = (event:any) =>{
          this.url = event.target.result
        }
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
