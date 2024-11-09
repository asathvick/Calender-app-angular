import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
})

export class AppointmentDialogComponent {
  appointmentForm: FormGroup;
  httpclient : HttpClient
  postUrl="http://localhost:3000/postCalenderdata"
  updateUrl="http://localhost:3000/updateCalenderdata"
  // data={
  //   title:'dummy',
  //   date:new Date(),
  //   startTime: 'dum',
  //   endTime: 'dum'
  // }
  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      uuid: string;
      date: Date;
      title: string;
      startTime: string;
      endTime: string;
      color: string;
    },
    private formBuilder: FormBuilder,
    http: HttpClient
  ) {
    console.log(this.data.startTime+" "+this.data.endTime)
    this.appointmentForm = this.formBuilder.group(
      {
        title: [this.data.title || '', Validators.required],
        date: [this.data.date, Validators.required],
        startTime: [this.data.startTime || '', Validators.required],
        endTime: [this.data.endTime || '', Validators.required],
      },
      { validators: this.timeRangeValidator }
    );
    this.httpclient=http
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSaveClick(): void {
    if (this.appointmentForm.valid) {
      const data = {
        title: this.appointmentForm.controls['title'].value,
        date: this.appointmentForm.controls['date'].value,
        startTime: this.appointmentForm.controls['startTime'].value,
        endTime: this.appointmentForm.controls['endTime'].value,
        uuid: this.data.uuid,
      };
      this.makeHttpUpdateCallForAppointments(data)
      this.dialogRef.close(data);
    }

    
  }

  onAddClick(): void {
    if (this.appointmentForm.valid) {
      const data = {
        title: this.appointmentForm.controls['title'].value,
        date: this.appointmentForm.controls['date'].value,
        startTime: this.appointmentForm.controls['startTime'].value,
        endTime: this.appointmentForm.controls['endTime'].value,
        uuid: this.data.uuid,
      };
      console.log(data)
      this.makeHttpCreateCallForAppointments(data)
      this.dialogRef.close(data);
    }

    
  }

//changes for http call - start
makeHttpCreateCallForAppointments(d:any): void {
  let httpparams= new HttpParams()
  httpparams=httpparams.append('title',d.title)
  httpparams=httpparams.append('date',d.date.toDateString())
  httpparams=httpparams.append('startTime',d.startTime)
  httpparams=httpparams.append('endTime',d.endTime)
  console.log("here in makehttp")
  //this.httpclient.get(this.postUrl,{params: httpparams})
  //this.httpclient.request('GET',this.postUrl+'?'+'title='+t+'&date='+d.toDateString()+'&startTime'+s+'&endTime'+e).subscribe((data)=>{
  //  console.log(data)
  //})
  this.httpclient.request('GET',this.postUrl,{params: httpparams}).subscribe((data)=>{
      console.log(data)
  })
  // const res=this.httpclient.request('GET',this.postUrl,{responseType:'json'},{params: httpparams}).subscribe((data)=>{
  //   console.log(data)
  // })
  // console.log()
}


makeHttpUpdateCallForAppointments(d:any): void {
  let httpparams= new HttpParams()
  httpparams=httpparams.append('title',d.title)
  httpparams=httpparams.append('date',d.date.toDateString())
  httpparams=httpparams.append('startTime',d.startTime)
  httpparams=httpparams.append('endTime',d.endTime)
  httpparams=httpparams.append('id',d.uuid)
  console.log("here in makehttpUpdate")
  //this.httpclient.get(this.postUrl,{params: httpparams})
  //this.httpclient.request('GET',this.postUrl+'?'+'title='+t+'&date='+d.toDateString()+'&startTime'+s+'&endTime'+e).subscribe((data)=>{
  //  console.log(data)
  //})
  this.httpclient.request('GET',this.updateUrl,{params: httpparams}).subscribe((data)=>{
      console.log(data)
  })
  // const res=this.httpclient.request('GET',this.postUrl,{responseType:'json'},{params: httpparams}).subscribe((data)=>{
  //   console.log(data)
  // })
  // console.log()
}
//changes for http call - end



  

  


  onDeleteClick(): void {
    this.dialogRef.close({ remove: true, uuid: this.data.uuid });
  }

  timeRangeValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const startTime = control.get('startTime')?.value;
    const endTime = control.get('endTime')?.value;
    if (startTime && endTime) {
      const [startHours, startMinutes] = startTime.split(':');
      const [endHours, endMinutes] = endTime.split(':');

      const startDate = new Date();
      startDate.setHours(startHours);
      startDate.setMinutes(startMinutes);

      const endDate = new Date();
      endDate.setHours(endHours);
      endDate.setMinutes(endMinutes);

      if (startDate > endDate) {
        return { timeRangeInvalid: true };
      }
    }
    return null;
  };
}

