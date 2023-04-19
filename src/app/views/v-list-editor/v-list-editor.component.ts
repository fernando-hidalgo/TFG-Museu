import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap, tap } from 'rxjs';
import { ArtlistService } from 'src/app/services/artlist.service';
import { AuthService } from 'src/app/services/auth.service';

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
    buttonCancel: "Cancelar",
    buttonDelete: "Eliminar"
  }
  coverImage
  baseRedirect: string
  currentUser: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artlistService: ArtlistService,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.userMe().authId

    this.baseRedirect = `/profile/${this.currentUser}/lists`
    
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

  setCoverImage(event){
    this.coverImage = event.image
  }

  deleteArtwork(event){
    let currentArtworks = this.data.artworks.filter(artwork => artwork.id !== event.artworkId)
    this.artlistService
    .getListToEdit(this.artlistId, { currentArtworks })  //Los artworks actuales - el eliminado
    .pipe(
      tap(data => this.loadData(data))
    )
    .subscribe();
  }

  saveListChanges() {
    let editListFormValues = this.editListForm.value;

    let body = {
      name: editListFormValues.listName,
      text: editListFormValues.listDescription,
      artworksIds: this.data.artworks.map(artwork => artwork.id),
    }

    const coverImageToSave = new FormData();
    coverImageToSave.append('file', this.coverImage);

    this.artlistService.updateList(this.artlistId, body)
      .pipe(
        switchMap(() => {
          if (this.coverImage) {
            return this.artlistService.saveCover(this.artlistId, coverImageToSave);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(() => {
        this.redirectTo(`${this.baseRedirect}/${this.artlistId}`)
      });
  }

  deleteList(){
    //TODO: Debe abrir un modal de aviso, mover la lógica aqui presente a ese modal
    this.artlistService.deleteList(this.artlistId).subscribe(() => {
      this.redirectTo(this.baseRedirect)
    });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri])
    );
  }

}
