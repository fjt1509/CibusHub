import {ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';


export class DOMHelper<T> {

  private fixture: ComponentFixture<T>;
  constructor(fixture: ComponentFixture<T>) {
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
  findAll(tagName: string) {
    return this.fixture.debugElement
      .queryAll(By.css(tagName));
  }
  clickButton(buttonText: string) {
    this.findAll('button').forEach(button => {
      const buttonElement: HTMLButtonElement =
        button.nativeElement;
      if (buttonElement.textContent === buttonText) {
        buttonElement.click();
      }
    });
  }
}
