import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";

@Injectable()
export class CategoryService{
    public categories:Category[];

    constructor(
        private http:HttpClient
    ){this.categories = [];}

    

    createCategories(){
        this.categories = [ new Category(0,'Herramientas','la categoría de herramientas es un verdadero tesoro para todos los entusiastas del bricolaje, profesionales y aficionados por igual.nuestra amplia gama de herramientas manuales y eléctricas te brinda opciones para cada proyecto y tarea.','assets/img/herramientas.png','imagen_banner.png'),
                            new Category(1,'Eventos','aca encontrara todo lo que necesitas para crear experiencias inolvidables. Desde altavoces potentes y mesas de mezclas hasta micrófonos profesionales y luces espectaculares, lo necesario para dar vida a tus eventos.','assets/img/eventos.png','jjhh.png'),
                            new Category(2,'Industria','destino perfecto para aquellos que buscan maximizar su eficiencia en proyectos industriales. Ofrecemos una amplia variedad de equipos de calidad, desde maquinaria pesada y herramientas especializadas como equipos de medición y seguridad.','assets/img/industria.png','banner.png'),
                            new Category(3,'Deportes','destino perfecto para aquellos que buscan maximizar su eficiencia en proyectos industriales. Ofrecemos una amplia variedad de equipos de calidad, desde maquinaria pesada y herramientas especializadas como equipos de medición y seguridad.','assets/img/deportes.png','dldodo.png'),
                            new Category(4,'CategoriaOtra','destino perfecto para aquellos que buscan maximizar su eficiencia en proyectos industriales. Ofrecemos una amplia variedad de equipos de calidad, desde maquinaria pesada y herramientas especializadas como equipos de medición y seguridad.categoria','assets/img/otra.png','dldodo.png'),
                            new Category(5,'Carpintería','destino perfecto para aquellos que buscan maximizar su eficiencia en proyectos industriales. Ofrecemos una amplia variedad de equipos de calidad, desde maquinaria pesada y herramientas especializadas como equipos de medición y seguridad.','assets/img/carpinteria.png','dldodo.png')
                     ];
        return this.categories;
    }

    getDetailCategory(id:number){
        let category: Category = this.categories[id];
        return category;
    }

}    