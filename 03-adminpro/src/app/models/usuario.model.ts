import { environment } from "src/environments/environment"

const base_url = environment.base_url;


export class Usuario {
    
    constructor(
        public nombre : string,
        public email : string,
        public password? : string,
        public img?: string,
        public google? : string,
        public role?: string,
        public uid?: string
    ){}

    get imagenUrl(){
        // /upload/usuarios/29796c7d-d98b-4703-8c7d-1bc833c80ef8.jpg

        // debugger;/
        
        if(!this.img){
            return `${base_url}/upload/usuarios/no-imagen`;
        }else if(this.img){
            return `${base_url}/upload/usuarios/${this.img}`;
        }else {
            return `${base_url}/upload/usuarios/no-imagen`;
        }

    }
}