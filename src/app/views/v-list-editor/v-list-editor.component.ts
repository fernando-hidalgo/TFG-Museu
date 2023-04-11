import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { ArtlistService } from 'src/app/services/artlist.service';

@Component({
  selector: 'app-v-list-editor',
  templateUrl: './v-list-editor.component.html',
  styleUrls: ['./v-list-editor.component.scss']
})
export class VListEditorComponent implements OnInit {
  data
  page: number = 1;
  editMode: boolean = true;
  artlistId: number;
  editListForm: FormGroup;
  literals = {
    buttonSave: "Guardar",
    buttonCancel: "Cancelar"
  }

  currentUser = 2  //TODO: Debe ser cambiado por datos del usuario actualmente logueado

  constructor(private route: ActivatedRoute, private artlistService: ArtlistService, private fb: FormBuilder) { }

  ngOnInit(): void {
    //Initial structure and values
    this.editListForm = this.fb.group({
      listName: '',
      listDescription: ''
    });

    this.route.params.subscribe(async urlParams => {
      this.artlistId = urlParams['artlistId']
      this.artlistService.getListToEdit(this.artlistId).subscribe(data => {

        this.editListForm = this.fb.group({
          listName: data['name'],
          listDescription: data['description']
        });

        this.loadData(data)
      });
    });
  }

  loadData(data){
    this.data = data;
  }

  updateData(event){
    this.artlistService
    .getListToEdit(this.artlistId, { currentArtworks: [...this.data.artworks, event.data] })  //Los artworks actuales + el nuevo
    .pipe(
      tap(data => this.loadData(data))
    )
    .subscribe();
  }

  saveListChanges(){
    let editListFormValues = this.editListForm.value;
    let body = {
      name: editListFormValues.listName,
      text: editListFormValues.listDescription
    }
    this.artlistService.updateList(this.artlistId, body).subscribe();
  }

}
