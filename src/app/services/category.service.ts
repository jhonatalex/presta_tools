import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";

@Injectable()
export class CategoryService{
    public categories:Category[];

    constructor(
        private http:HttpClient
    ){
        this.categories = [];  
    }

    createCategories(){
        this.categories = [ new Category(0,'Herramientas','la categoría de herramientas es un verdadero tesoro para todos los entusiastas del bricolaje, profesionales y aficionados por igual.nuestra amplia gama de herramientas manuales y eléctricas te brinda opciones para cada proyecto y tarea.','imagen.png','imagen_banner.png'),
                            new Category(0,'Eventos','aca encontrara todo lo que necesitas para crear experiencias inolvidables. Desde altavoces potentes y mesas de mezclas hasta micrófonos profesionales y luces espectaculares, lo necesario para dar vida a tus eventos.','img.jpg','jjhh.png'),
                            new Category(0,'Industria','destino perfecto para aquellos que buscan maximizar su eficiencia en proyectos industriales. Ofrecemos una amplia variedad de equipos de calidad, desde maquinaria pesada y herramientas especializadas como equipos de medición y seguridad.','sjdhkjshd.png','banner.png'),
                            new Category(0,'Deportes','aqui va descripcion deportes','imagen.jpg','dldodo.png'),
                            new Category(0,'CategoriaOtra','aqui va descripcion categoria','imagen.jpg','dldodo.png'),
                            new Category(0,'CategoriaOtra_2','aqui va descripcion categoria_2','imagen.jpg','dldodo.png')
                     ];
        return this.categories;
    }

}    