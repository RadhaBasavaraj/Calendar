import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "[app-calendar]",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"]
})
export class CalendarComponent implements OnInit {
  currentDay: string;
  currentMonth: string;
  currentDate: string;
  currentYear: string;
  fullMonth: string;
  fullYear: string;
  numberOfDays: number;
  moveMonthTracker: number;
  moveYearTracker: number;
  moveCountTracker: number;
  selectedDate: string;
  rows = [];
  @Output() sendSelectedDate = new EventEmitter();

  constructor() {}

  ngOnInit() {
    let todaysDate: any;
    let todayDateAsString: string;
    let dateComponents = [];

    todaysDate = new Date();
    todayDateAsString = todaysDate.toString();
    dateComponents = todayDateAsString.split(" ");

    this.currentDay = dateComponents[0] + "day";
    this.currentMonth = dateComponents[1].toUpperCase();
    this.currentDate = dateComponents[2];
    this.currentYear = dateComponents[3];

    this.fullYear = this.currentYear;
    this.moveMonthTracker = todaysDate.getMonth();
    this.moveYearTracker = parseInt(this.currentYear);
    this.moveCountTracker = 0;
    this.populateNumberOfDays(todaysDate.getMonth(), days => {
      this.numberOfDays = days;
    });
    this.populateFullMonth(todaysDate.getMonth(), fullMonth => {
      this.fullMonth = fullMonth;
    });
    this.populateDateValues(
      todaysDate.getMonth(),
      this.currentYear,
      this.numberOfDays
    );
  }

  populateNumberOfDays(month, cb) {
    if (
      month == 0 ||
      month == 2 ||
      month == 4 ||
      month == 6 ||
      month == 7 ||
      month == 9 ||
      month == 11
    ) {
      cb(31);
    } else if (month == 1) {
      cb(28);
    } else {
      cb(30);
    }
  }

  populateFullMonth(month, cb) {
    if (month == 0) cb("January");
    if (month == 1) cb("February");
    if (month == 2) cb("March");
    if (month == 3) cb("April");
    if (month == 4) cb("May");
    if (month == 5) cb("June");
    if (month == 6) cb("July");
    if (month == 7) cb("August");
    if (month == 8) cb("September");
    if (month == 9) cb("October");
    if (month == 10) cb("November");
    if (month == 11) cb("December");
  }

  populateDateValues(month, year, days) {
    let tempArray = [];
    let tempVal = 0;
    let shiftValue = 0;
    let d = new Date(parseInt(year), month, 1);
    let firstDay = d.toString().substr(0, 3);

    if (firstDay == "Sun") shiftValue = 0;
    if (firstDay == "Mon") shiftValue = 1;
    if (firstDay == "Tue") shiftValue = 2;
    if (firstDay == "Wed") shiftValue = 3;
    if (firstDay == "Thu") shiftValue = 4;
    if (firstDay == "Fri") shiftValue = 5;
    if (firstDay == "Sat") shiftValue = 6;

    let shiftValueBackup = shiftValue;
    for (var i = 0; i < 6; i++) {
      for (var j = tempVal; j < tempVal + 7; j++) {
        if (shiftValue) {
          tempArray.push("");
          shiftValue--;
        } else {
          if (j + 1 - shiftValueBackup <= days) {
            tempArray.push(j + 1 - shiftValueBackup);
          } else {
            break;
          }
        }
      }
      tempVal = j;
      this.rows[i] = { row: [...tempArray] };
      tempArray = [];
    }
  }

  moveBack() {
    let movePreviousDays;

    if (this.moveMonthTracker == 0) {
      this.moveMonthTracker = 11;
      this.moveYearTracker--;
      this.fullYear = this.moveYearTracker.toString();
    } else {
      this.moveMonthTracker--;
    }
    this.populateNumberOfDays(this.moveMonthTracker, days => {
      movePreviousDays = days;
    });
    this.populateDateValues(
      this.moveMonthTracker,
      this.moveYearTracker,
      movePreviousDays
    );
    this.populateFullMonth(this.moveMonthTracker, fullMonth => {
      this.fullMonth = fullMonth;
    });
    this.moveCountTracker--;
  }

  moveForward() {
    let moveForwardDays;
    this.selectedDate = "999";

    if (this.moveMonthTracker == 11) {
      this.moveMonthTracker = 0;
      this.moveYearTracker++;
      this.fullYear = this.moveYearTracker.toString();
    } else {
      this.moveMonthTracker++;
    }
    this.populateNumberOfDays(this.moveMonthTracker, days => {
      moveForwardDays = days;
    });
    this.populateDateValues(
      this.moveMonthTracker,
      this.moveYearTracker,
      moveForwardDays
    );
    this.populateFullMonth(this.moveMonthTracker, fullMonth => {
      this.fullMonth = fullMonth;
    });
    this.moveCountTracker++;
  }

  dateSelected(date) {
    this.selectedDate = date;
  }

  cancelCalendar() {
    this.sendSelectedDate.emit("Cancelled");
  }

  saveCalendar() {
    let dd, mm, yyyy;

    if (parseInt(this.selectedDate) < 10) {
      dd = "0" + this.selectedDate;
    } else {
      dd = this.selectedDate;
    }

    if (this.moveMonthTracker + 1 < 10) {
      mm = "0" + (this.moveMonthTracker + 1).toString();
    } else {
      mm = (this.moveMonthTracker + 1).toString();
    }

    yyyy = this.moveYearTracker.toString();

    let finalDate = dd + "/" + mm + "/" + yyyy;
    this.sendSelectedDate.emit(finalDate);
  }
}
