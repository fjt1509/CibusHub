import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPostAddComponent } from './forum-post-add.component';

describe('ForumPostAddComponent', () => {
  let component: ForumPostAddComponent;
  let fixture: ComponentFixture<ForumPostAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumPostAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumPostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
