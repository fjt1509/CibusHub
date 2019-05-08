import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPostMyPostsComponent } from './forum-post-my-posts.component';

describe('ForumPostMyPostsComponent', () => {
  let component: ForumPostMyPostsComponent;
  let fixture: ComponentFixture<ForumPostMyPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumPostMyPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumPostMyPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 */

});
