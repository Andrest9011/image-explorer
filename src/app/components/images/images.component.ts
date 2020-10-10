import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  @ViewChild('modal_1') modal_1: TemplateRef<any>;
    @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;
    backdrop: any

  images: any[] = [];
  image?: {
    url:string,
    tags: string[],
    views: number,
    likes: number
  };
  page = 1;
  lastPage = 2;
  searchForm: FormGroup;
  query = "";
  category?: string;
  categories = [
    { label: 'Todo' },
    { label: 'Ciencia', value: 'science' },
    { label: 'Educación', value: 'education' },
    { label: 'Personas', value: 'people' },
    { label: 'Emociones', value: 'feelings' },
    { label: 'Computación', value: 'computer' },
    { label: 'Edificios', value: 'buildings' }
  ];


  constructor(private imgService: ImagesService, private formBuilder: FormBuilder) {
    this.searchForm = formBuilder.group({
      search: ''
    })
  }

  ngOnInit(): void {
    this.callImagesApi();
  }

  onSubmit(inputSearch) {
    this.page = 1;
    this.query = inputSearch.search.toLowerCase();
    this.callImagesApi();
  }

  selectCategory(category: string) {
    this.page = 1;
    this.category = category;
    this.callImagesApi();
  }

  // callImagesApi() {
  //   this.imgService.getImages(this.page, this.category, this.query)
  //     .subscribe((data: any) => {
  //       this.lastPage = (data.totalHits / ImagesService.PAGE_SIZE) + 1;
  //       this.images = data.hits;
  //     })
  // }

  selectImage(image){
    const { webformatURL, tags, views, likes } = image;
    const tagsArray = tags.split(",").map((t) => t.trim());
    
    this.image = {url: webformatURL, tags: tagsArray, views, likes};
    this.showDialog();  
  }

  onScroll() {
    if (this.page < this.lastPage) {
      this.page ++;
      this.callImagesApi(this.addImages);
    } 
  }
	
	replaceImages(self, images) {
		self.images = images;
	}

	addImages(self, images) {
		self.images = [...self.images, ...images];
	}

	callImagesApi(callback: (self, images) => void = this.replaceImages) {
		const self = this;
		this.imgService.getImages(self.page, self.category, self.query)
      .subscribe((data: any) => {
				self.lastPage = (data.totalHits / ImagesService.PAGE_SIZE) + 1;
				callback(self, data.hits);
			});
	}


  showDialog(){
    let view = this.modal_1.createEmbeddedView(null);
    this.vc.insert(view);
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.add('modal-open'); 
    this.modal_1.elementRef.nativeElement.previousElementSibling.style.display = 'block';
    this.backdrop = document.createElement('DIV')
    this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop)
}

  closeDialog() {
    this.vc.clear()
    document.body.removeChild(this.backdrop)
  }


}
