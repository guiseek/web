import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { webHttp } from '@web/web/http';

@Component({
  selector: 'web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  subtitle = 'web';
  constructor(private http: HttpClient) {
    window.setTimeout(() => {
      this.subtitle = 'web app';
    }, 3000);
  }

  ngOnInit() {
    const webCard = document.querySelector('web-card');

    console.log(webCard);

    this.http.get('/api')
      .subscribe(console.log);

    this.http.get('https://api.npms.io/v2/search?q=author:guiseek')
      .subscribe(console.log);

    webCard.addEventListener('cardClicked', (ev) => {
      console.log(ev);
    })
  }
}
