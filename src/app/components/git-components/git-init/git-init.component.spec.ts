import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitInitComponent } from './git-init.component';

describe('GitInitComponent', () => {
  let component: GitInitComponent;
  let fixture: ComponentFixture<GitInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GitInitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
