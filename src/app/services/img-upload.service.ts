import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {
  public url = `${environment.backend_url}/api/uploads`; 
  constructor() { }

  async imgUpload(img: File, id: string) {
    this.url += `/${id}`; 
    
    const formData = new FormData(); 
    formData.append('img', img); 

    try {
      const res = await fetch(
        this.url, 
        {
          method: 'PUT',
          headers: {
            'x-token': localStorage.getItem('x-token') || ''
          },
          body: formData
        }
      )

      const data = await res.json(); 
      
      if(data.ok) { 
        return data;
      } else {
        console.log(data); 
        return Swal.fire('Error', '', 'error');
      }
    } catch (error) {
      console.log(error); 
      Swal.fire('Error', '', 'error'); 
    }
  }
}
