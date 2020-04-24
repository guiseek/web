import { Component, OnInit } from '@angular/core';
import { webHttp } from '@web/web/http';

@Component({
  selector: 'web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  subtitle = 'web';
  constructor() {
    window.setTimeout(() => {
      this.subtitle = 'web app';
    }, 3000);
  }

  ngOnInit() {
    const webCard = document.querySelector('web-card');

    console.log(webCard);

    const site = webHttp({ method: 'GET', url: 'https://api.npms.io/v2/search?q=author:guiseek' });
    site.then((res) => {
      console.log(res);

    })

    webCard.addEventListener('cardClicked', (ev) => {
      console.log(ev);
    })
  }
}
