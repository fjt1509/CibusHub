import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPostDetailsComponent } from './forum-post-details.component';

describe('ForumPostDetailsComponent', () => {
  let component: ForumPostDetailsComponent;
  let fixture: ComponentFixture<ForumPostDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumPostDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumPostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
