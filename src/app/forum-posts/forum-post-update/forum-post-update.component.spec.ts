import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPostUpdateComponent } from './forum-post-update.component';

describe('ForumPostUpdateComponent', () => {
  let component: ForumPostUpdateComponent;
  let fixture: ComponentFixture<ForumPostUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumPostUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumPostUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 */
});
