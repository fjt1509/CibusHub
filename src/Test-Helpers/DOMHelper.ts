import {ComponentFixture} from '@angular/core/testing';
import {HomepageComponent} from '../app/home/homepage/homepage.component';
import {By} from '@angular/platform-browser';


export class DOMHelper {

  private fixture: ComponentFixture<HomepageComponent>;
  constructor(fixture: ComponentFixture<HomepageComponent>){
    this.fixture = fixture;
  }

  singleText(tagName: string): string {
    const h1Ele = this.fixture.debugElement.query(By.css(tagName));
    if (h1Ele) {
      return h1Ele.nativeElement.textContent;
    }
  }
  count(tagName: string): number {
    const elements = this.fixture.debugElement
      .queryAll(By.css(tagName));
    return elements.length;
  }

}
