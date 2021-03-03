import { Component, Input, OnInit, Renderer2, Inject} from "@angular/core";
import { DOCUMENT } from "@angular/common";
@Component({
  selector: "app-seat-picker",
  templateUrl: "./seat-picker.component.html",
  styleUrls: [
    "./styles/seat-picker.component.less",
  ]
})
export class SeatPickerComponent implements OnInit {
  @Input() eventId: string;
  @Input() performanceId: string;
  constructor(
      private renderer2: Renderer2,
      @Inject(DOCUMENT) private document: Document
  ) { }
  ngOnInit(): void {
    const script = this.renderer2.createElement("script");
    script.type = `application/javascript`;
    script.text = ``;
    script.src = `/assets/lib/ingresso/feather.min.js`;
    script.onload = this.launchFeather.bind(this);
    this.renderer2.appendChild(this.document.body, script);
  }
  private launchFeather() {
    const script = this.renderer2.createElement("script");
    script.type = `application/javascript`;
    script.text = `
      var chartConfig = {
        eventID: '7AB', // demo event
        perfID: '7AB-9',
        selector: '#ingresso-widget',
        token: '<The-X-B2B-Token>' // see the Authentication section in the README
      }
      var chart = new IngressoSeatingPlan();
      chart.init(chartConfig);
      chart.showLegend();
    `;
    this.renderer2.appendChild(this.document.body, script);
  }
}