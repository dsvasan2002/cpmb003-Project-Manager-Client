import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProjectClass } from 'src/app/model/project.model';
import { ProjectService } from 'src/app/service/project.service';


declare var $ :any;

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.css']
})
export class ProjectSearchComponent implements OnInit {
  @Output() selectedProject = new EventEmitter<ProjectClass>();

  filteredProjectsList: ProjectClass[];
  projectsList: ProjectClass[];
  aProject: ProjectClass;
  _searchProjectString: string;
  errorBlock: boolean = false;
  errorText: any;
  enableAddButton: boolean = false;

  constructor(private _projectService: ProjectService) {
    this.aProject = new ProjectClass();
   }

  ngOnInit() {
    this.getAllProjects();
  }

  public get searchProjectString(): string {
    return this._searchProjectString;
  }
  public set searchProjectString(value: string) {
    this._searchProjectString = value;
    this.filteredProjectsList = this.filterProjectsByName(this._searchProjectString);
  }

  getAllProjects() {
    this._projectService.getAllProjects().subscribe((response: any)=>{
      if (response['success']) {
        this.projectsList = response['data'];
        this.filteredProjectsList = response['data'];
      } 
    }, (error: any) => {
      this.errorBlock = true;
      this.errorText = error['message'];
    });
  }

  filterProjectsByName(searchString: string): ProjectClass[] {
    return this.projectsList.filter(project => 
      project.projectName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  selectProject(aProjectId: number) {
    this._projectService.getAProject(aProjectId).subscribe((res: any)=>{
      if (res['success']) {
        this.aProject = res['data'];
        this.enableAddButton = true;
      }  else {
        alert('Error in fetching the project.. please try again');
        this.enableAddButton = false;
      }
    });
  }

  addProject() {
    this.selectedProject.emit(this.aProject);
    $('#projectSearchModal').modal('toggle');
  }


}
