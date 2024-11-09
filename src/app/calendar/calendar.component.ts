import { Component } from '@angular/core';

//changes for http client - start
import { HttpClient, HttpParams } from '@angular/common/http';
//changes for http client - end
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';

interface Appointment {
  uuid?: string;
  date: Date;
  title: string;
  startTime: string;
  endTime: string;
  color?: string;
}

export enum CalendarView {
  Month = 'month',
  Week = 'week',
  Day = 'day',
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  viewDate: Date = new Date();
  selectedDate: Date | null = null;
  selectedStartTime: string | undefined;
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthDays: Date[] = [];
  appointments: Appointment[] = [
    // {
    //   uuid: '00000000-0000-0000-0000-000000000001',
    //   date: new Date(
    //     new Date().getFullYear(),
    //     new Date().getMonth(),
    //     new Date().getDate()
    //   ),
    //   title: 'Meeting with Bob',
    //   startTime: '09:00',
    //   endTime: '10:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-000000000002',
    //   date: new Date(new Date().getFullYear(), new Date().getMonth(), 2),
    //   title: 'Lunch with Alice',
    //   startTime: '12:00',
    //   endTime: '13:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-000000000003',
    //   date: new Date(new Date().getFullYear(), new Date().getMonth(), 3),
    //   title: 'Project Deadline',
    //   startTime: '15:00',
    //   endTime: '16:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-000000000004',
    //   date: new Date(
    //     new Date().getFullYear(),
    //     new Date().getMonth(),
    //     new Date().getDate()
    //   ),
    //   title: 'Doctor Appointment',
    //   startTime: '10:00',
    //   endTime: '11:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-000000000005',
    //   date: new Date(
    //     new Date().getFullYear(),
    //     new Date().getMonth(),
    //     new Date().getDate() + 1
    //   ),
    //   title: 'Team Meeting',
    //   startTime: '14:00',
    //   endTime: '15:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-000000000006',
    //   date: new Date(
    //     new Date().getFullYear(),
    //     new Date().getMonth(),
    //     new Date().getDate()
    //   ),
    //   title: 'Coffee with Mike',
    //   startTime: '11:00',
    //   endTime: '12:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-000000000007',
    //   date: new Date(
    //     new Date().getFullYear(),
    //     new Date().getMonth(),
    //     new Date().getDate() + 4
    //   ),
    //   title: 'Client Call',
    //   startTime: '09:30',
    //   endTime: '10:30',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-000000000008',
    //   date: new Date(new Date().getFullYear(), new Date().getMonth(), 8),
    //   title: 'Gym',
    //   startTime: '17:00',
    //   endTime: '18:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-000000000009',
    //   date: new Date(
    //     new Date().getFullYear(),
    //     new Date().getMonth(),
    //     new Date().getDate() - 1
    //   ),
    //   title: 'Dentist Appointment',
    //   startTime: '11:30',
    //   endTime: '12:30',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-00000000000a',
    //   date: new Date(
    //     new Date().getFullYear(),
    //     new Date().getMonth(),
    //     new Date().getDate() - 2
    //   ),
    //   title: 'Birthday Party',
    //   startTime: '19:00',
    //   endTime: '21:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-00000000000b',
    //   date: new Date(new Date().getFullYear(), new Date().getMonth(), 11),
    //   title: 'Conference',
    //   startTime: '13:00',
    //   endTime: '14:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-00000000000c',
    //   date: new Date(new Date().getFullYear(), new Date().getMonth(), 12),
    //   title: 'Workshop',
    //   startTime: '10:00',
    //   endTime: '12:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-00000000000d',
    //   date: new Date(new Date().getFullYear(), new Date().getMonth(), 13),
    //   title: 'Brunch with Sarah',
    //   startTime: '11:00',
    //   endTime: '12:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-00000000000e',
    //   date: new Date(
    //     new Date().getFullYear(),
    //     new Date().getMonth(),
    //     new Date().getDate() + 2
    //   ),
    //   title: 'Networking Event',
    //   startTime: '18:00',
    //   endTime: '20:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-00000000000f',
    //   date: new Date(new Date().getFullYear(), new Date().getMonth(), 16),
    //   title: 'Yoga Class',
    //   startTime: '07:00',
    //   endTime: '08:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-000000000010',
    //   date: new Date(new Date().getFullYear(), new Date().getMonth(), 16),
    //   title: 'Strategy Meeting',
    //   startTime: '10:00',
    //   endTime: '11:30',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-000000000011',
    //   date: new Date(new Date().getFullYear(), new Date().getMonth(), 17),
    //   title: 'Call with Investor',
    //   startTime: '14:00',
    //   endTime: '15:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-000000000012',
    //   date: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
    //   title: 'Team Lunch',
    //   startTime: '12:00',
    //   endTime: '13:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-000000000013',
    //   date: new Date(
    //     new Date().getFullYear(),
    //     new Date().getMonth(),
    //     new Date().getDate() + 3
    //   ),
    //   title: 'HR Meeting',
    //   startTime: '16:00',
    //   endTime: '17:00',
    // },
    // {
    //   uuid: '00000000-0000-0000-0000-000000000014',
    //   date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
    //   title: 'Board Meeting',
    //   startTime: '11:00',
    //   endTime: '12:00',
    // },
  ];
  currentView: CalendarView = CalendarView.Month;
  timeSlots: string[] = [];

  weeks: Date[][] = [];

  public CalendarView = CalendarView;

  //change for http call - start
  getUrl="http://localhost:3000/getAll"
  httpclient : HttpClient
  updateUrl="http://localhost:3000/updateCalenderdata"
  deleteUrl="http://localhost:3000/deleteCalenderData"
  // interface Appointment {
  //   uuid?: string;
  //   date: Date;
  //   title: string;
  //   startTime: string;
  //   endTime: string;
  //   color?: string;
  // }
  //changes for http call - end
  constructor(public dialog: MatDialog, private http: HttpClient) {
    this.makeHttpGetCallForAppointments(http)
    this.appointments.forEach((appointment) => {
      appointment.color = this.getRandomColor();
    });
    this.generateView(this.currentView, this.viewDate);
    this.generateTimeSlots();
    this.httpclient=http
  }

  //changes for http call - start
  makeHttpGetCallForAppointments(http: HttpClient){
    const res=http.request('GET',this.getUrl,{responseType:'json'}).subscribe((data)=>{
      let arr=Object.values(data)
      for(let i=0;i<arr.length;i++){
        let tmp=JSON.parse(JSON.stringify(arr[i]))
        var appointmentInput = {
          uuid: tmp._id,
          date: new Date(tmp.date),
          title: tmp.event,
          startTime: tmp.startTime,
          endTime: tmp.endTime,
          color: tmp.color
        }
        this.appointments.push(appointmentInput)
      }
    })
    //console.log()
  }


  makeHttpUpdateCallForAppointments(d:any): void {
    let httpparams= new HttpParams()
    httpparams=httpparams.append('title',d.title)
    httpparams=httpparams.append('date',d.date.toDateString())
    httpparams=httpparams.append('startTime',d.startTime)
    httpparams=httpparams.append('endTime',d.endTime)
    httpparams=httpparams.append('id',d.uuid)
    //console.log("here in makehttpUpdate")
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


  makeHttpDeleteCallForAppointments(d:any): void {
    let httpparams= new HttpParams()
    httpparams=httpparams.append('id',d)
    //console.log("here in makehttpDelete")
    //this.httpclient.get(this.postUrl,{params: httpparams})
    //this.httpclient.request('GET',this.postUrl+'?'+'title='+t+'&date='+d.toDateString()+'&startTime'+s+'&endTime'+e).subscribe((data)=>{
    //  console.log(data)
    //})
    this.httpclient.request('GET',this.deleteUrl,{params: httpparams}).subscribe((data)=>{
        console.log(data)
    })
    // const res=this.httpclient.request('GET',this.postUrl,{responseType:'json'},{params: httpparams}).subscribe((data)=>{
    //   console.log(data)
    // })
    // console.log()
  }
  //changes for http call - end
  //changes for http call - end

  generateView(view: CalendarView, date: Date) {
    switch (view) {
      case CalendarView.Month:
        this.generateMonthView(date);
        break;
      case CalendarView.Week:
        this.generateWeekView(date);
        break;
      case CalendarView.Day:
        this.generateDayView(date);
        break;
      default:
        this.generateMonthView(date);
    }
  }

  generateMonthView(date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.weeks = [];
    this.monthDays = [];
    let week: Date[] = [];

    for (let day = start.getDay(); day > 0; day--) {
      const prevDate = new Date(start);
      prevDate.setDate(start.getDate() - day);
      week.push(prevDate);
      this.monthDays.push(prevDate);
    }

    for (let day = 1; day <= end.getDate(); day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      this.monthDays.push(currentDate);
      week.push(currentDate);
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }

    for (let day = 1; this.monthDays.length % 7 !== 0; day++) {
      const nextDate = new Date(end);
      nextDate.setDate(end.getDate() + day);
      this.monthDays.push(nextDate);
    }

    for (let day = 1; week.length < 7; day++) {
      const nextDate = new Date(end);
      nextDate.setDate(end.getDate() + day);
      week.push(nextDate);
    }

    if (week.length > 0) {
      this.weeks.push(week);
    }
  }

  generateWeekView(date: Date) {
    const startOfWeek = this.startOfWeek(date);
    this.monthDays = [];

    for (let day = 0; day < 7; day++) {
      const weekDate = new Date(startOfWeek);
      weekDate.setDate(startOfWeek.getDate() + day);
      this.monthDays.push(weekDate);
    }
  }

  generateDayView(date: Date) {
    this.monthDays = [date];
  }

  generateTimeSlots() {
    for (let hour = 0; hour <= 24; hour++) {
      const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      this.timeSlots.push(time);
    }
  }

  switchToView(view: CalendarView) {
    this.currentView = view;
    this.generateView(this.currentView, this.viewDate);
  }

  startOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(start.setDate(diff));
  }

  previous() {
    if (this.currentView === 'month') {
      this.viewDate = new Date(
        this.viewDate.setMonth(this.viewDate.getMonth() - 1)
      );
      this.generateMonthView(this.viewDate);
    } else if (this.currentView === 'week') {
      this.viewDate = new Date(
        this.viewDate.setDate(this.viewDate.getDate() - 7)
      );
      this.generateWeekView(this.viewDate);
    } else {
      this.viewDate = new Date(
        this.viewDate.setDate(this.viewDate.getDate() - 1)
      );
      this.generateDayView(this.viewDate);
    }
  }

  next() {
    if (this.currentView === 'month') {
      this.viewDate = new Date(
        this.viewDate.setMonth(this.viewDate.getMonth() + 1)
      );
      this.generateMonthView(this.viewDate);
    } else if (this.currentView === 'week') {
      this.viewDate = new Date(
        this.viewDate.setDate(this.viewDate.getDate() + 7)
      );
      this.generateWeekView(this.viewDate);
    } else {
      this.viewDate = new Date(
        this.viewDate.setDate(this.viewDate.getDate() + 1)
      );
      this.generateDayView(this.viewDate);
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  isSelected(date: Date): boolean {
    if (!this.selectedDate) {
      return false;
    }
    return (
      date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear()
    );
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  selectDate(date?: Date, startTime?: string) {
    if (date) {
      this.selectedDate = date;
    } else {
      this.selectedDate = new Date();
    }
    this.selectedStartTime = startTime;
    this.openDialog();
  }

  generateUUID(): string {
    let d = new Date().getTime(); //Timestamp
    let d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  addAppointment(
    date: Date,
    title: string,
    startTime: string,
    endTime: string
  ) {
    this.appointments.push({
      uuid: this.generateUUID(),
      date,
      title,
      startTime,
      endTime,
      color: this.getRandomColor(),
    });
  }

  deleteAppointment(appointment: Appointment, event: Event) {
    event.stopPropagation();
    const index = this.appointments.indexOf(appointment);
    if (index > -1) {
      this.appointments.splice(index, 1);
    }
  }

  openDialog(): void {
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const h = hour < 10 ? `0${hour}` : hour;
    const m = minutes < 10 ? `0${minutes}` : minutes;
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      panelClass: 'dialog-container',
      data: {
        date: this.selectedDate,
        title: '',
        startTime: this.selectedStartTime || `${h}:${m}`,
        endTime: this.selectedStartTime || `${h}:${m}`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addAppointment(
          result.date,
          result.title,
          result.startTime,
          result.endTime
        );
      }
    });
  }

  getAppointmentsForDate(day: Date, timeSlots: string[]) {
    return this.appointments
      .filter((appointment) => {
        return this.isSameDate(appointment.date, day);
      })
      .map((appointment) => {
        const startTimeIndex = timeSlots.indexOf(appointment.startTime);
        const endTimeIndex = timeSlots.indexOf(appointment.endTime);
        return { ...appointment, startTimeIndex, endTimeIndex };
      });
  }

  drop(event: CdkDragDrop<Appointment[]>, date: Date, slot?: string) {
    const movedAppointment = event.item.data;
    movedAppointment.date = date;
    console.log(slot)
    if (slot) {
      var timeStart = new Date("01/01/2007 " + movedAppointment.startTime).getHours();
      var timeEnd = new Date("01/01/2007 " + movedAppointment.endTime).getHours();
      var timeStartmin = new Date("01/01/2007 " + movedAppointment.startTime).getMinutes();
      var timeEndmin = new Date("01/01/2007 " + movedAppointment.endTime).getMinutes();
      var diff=timeEnd-timeStart
      var diffmin=timeEndmin-timeStartmin
      movedAppointment.startTime = slot;
      if(diff!=0){
        movedAppointment.endTime = this.addHourToMilitaryTime(slot,diff);
        if(diffmin!=0){
          movedAppointment.endTime = this.addMinutesToMilitaryTime(movedAppointment.endTime,diffmin);
        }
      }
      else if(diffmin!=0){
        movedAppointment.endTime = this.addMinutesToMilitaryTime(slot,diffmin);
      }
      
      
    }

    this.makeHttpUpdateCallForAppointments(movedAppointment)
  }
  //
  addHourToMilitaryTime(time: string, diff: number): string {
    const [hours, minutes] = time.split(':').map(Number);
    let newHours = hours + diff;
    if (newHours === 24) {
      newHours = 0;
    }
  
    return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  addMinutesToMilitaryTime(time: string, diffmin: number): string {
    const [hours, minutes] = time.split(':').map(Number);
    
    let newMin = minutes + diffmin;
    if (newMin >60) {
      newMin = 0;
    }
  
    return `${hours.toString().padStart(2, '0')}:${newMin.toString().padStart(2, '0')}`;
  }
  //

  viewToday(): void {
    this.viewDate = new Date();
    this.generateMonthView(this.viewDate);
  }

  isCurrentMonth(date: Date): boolean {
    return (
      date.getMonth() === this.viewDate.getMonth() &&
      date.getFullYear() === this.viewDate.getFullYear()
    );
  }

  getAppointmentsForDateTime(date: Date, timeSlot: string): Appointment[] {
    const appointmentsForDateTime: Appointment[] = this.appointments.filter(
      (appointment) =>
        // this.isSameDate(appointment.date, date) &&
        // appointment.startTime <= timeSlot &&
        // appointment.endTime >= timeSlot
        //changes for day defect - start
        // this.isSameDate(appointment.date, date) &&
        // appointment.startTime <= timeSlot &&
        // appointment.endTime > timeSlot
        this.isSameDate(appointment.date,date)&& this.compareHours(appointment.startTime,appointment.endTime,timeSlot)

        //changes for day defect - end
        );
    return appointmentsForDateTime;
  }

  //
  compareHours(startTime: string, endTime: string, slot:string){
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const [slotHour, slotMin] = slot.split(':').map(Number);
    if(startHour<=slotHour && endHour>slotHour){   
      return true}
    else if(startHour<=slotHour && endHour==slotHour && endMin>0){
      return true
    }
    return false
  }
  //

  getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 0.4;
    return `rgba(${r},${g},${b},${a})`;
  }

  editAppointment(appointment: Appointment, event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      panelClass: 'dialog-container',
      data: appointment,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.appointments.findIndex(
          (appointment) => appointment.uuid === result.uuid
        );
        if (result.remove) {
          this.makeHttpDeleteCallForAppointments(result.uuid)
          this.appointments.splice(index, 1);
        } else {
          this.appointments[index] = result;
        }
      }
    });
  }
}
