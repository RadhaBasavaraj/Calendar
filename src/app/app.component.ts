import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  isFocused = false;
  currentDate = "";

  constructor() {}

  showCalendar() {
    this.isFocused = true;
    let d = new Date();
    let dd, mm, yyyy;

    if (d.getDate() < 10) {
      dd = "0" + d.getDate().toString();
    } else {
      dd = d.getDate().toString();
    }

    if (d.getMonth() + 1 < 10) {
      mm = "0" + (d.getMonth() + 1).toString();
    } else {
      mm = (d.getMonth() + 1).toString();
    }

    yyyy = d.getFullYear().toString();
    this.currentDate = dd + "/" + mm + "/" + yyyy;
  }

  displaySelectedDate(date) {
    if (date == "Cancelled") {
      this.isFocused = false;
    } else {
      this.currentDate = date;
      this.isFocused = false;
    }
  }
}
