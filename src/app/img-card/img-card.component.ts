import { Component, OnInit } from '@angular/core';

class CatImage {
  message: string;
  api: string;
  fontsize: number;
}

class Button { 
  text: string;
  disabled: boolean;
  color: string;
}

@Component({
  selector: 'app-img-card',
  templateUrl: './img-card.component.html',
  styleUrls: ['./img-card.component.css']
})
export class ImgCardComponent implements OnInit {

  private image: CatImage = {
    message: 'Angular 5 PWA',
    api: 'https://cataas.com/cat/says/',
    fontsize: 40
  };

  public src: string;

  public button: Button = {
    text: 'Me dê outro gato!',
    color: 'primary',
    disabled: false
  };

  constructor() { }

  ngOnInit() {
    this.generateSrc();

    if (!navigator.onLine) {
      this.button.text = 'Desculpe, você está off-line';
      this.button.disabled = true;
    }
  }

  generateSrc(): void {
    this.src = this.image.api + this.image.message +
      '?size=' + this.image.fontsize +
      '&ts=' + Date.now();
  }

}
