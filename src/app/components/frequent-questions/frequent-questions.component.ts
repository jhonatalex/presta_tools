import { Component, OnInit } from '@angular/core';

export interface FAQItem {
  id: string;
  category: 'todos' | 'prestatools' | 'herramientas' | 'usuarios' | 'pagos';
  categoryLabel: string;
  question: string;
  answer: string;
  icon: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-frequent-questions',
  templateUrl: './frequent-questions.component.html',
  styleUrls: ['./frequent-questions.component.css']
})
export class FrequentQuestionsComponent implements OnInit {

  searchTerm: string = '';
  selectedCategory: string = 'todos';

  categories = [
    { id: 'todos', label: 'Todos', icon: 'fa-th-large' },
    { id: 'prestatools', label: 'PrestaTools', icon: 'fa-info-circle' },
    { id: 'herramientas', label: 'Herramientas', icon: 'fa-wrench' },
    { id: 'usuarios', label: 'Usuarios y Registro', icon: 'fa-user-circle' },
    { id: 'pagos', label: 'Pagos y Garantía', icon: 'fa-credit-card' },
  ];

  faqs: FAQItem[] = [
    {
      id: 'faq1',
      category: 'prestatools',
      categoryLabel: 'PrestaTools',
      icon: 'fa-line-chart',
      question: '¿Cuáles son los beneficios de utilizar PrestaTools en lugar de comprar herramientas nuevas?',
      answer: 'Alquilar en PrestaTools te permite ahorrar hasta un 80% frente al costo de comprar herramientas profesionales que solo usarás unas pocas veces. Además, evitas gastos de almacenamiento y mantenimiento, contribuyes a una economía colaborativa más sostenible reduciendo la huella de carbono y accedes a equipos de marcas líderes listos para trabajar.',
      isOpen: true
    },
    {
      id: 'faq2',
      category: 'herramientas',
      categoryLabel: 'Herramientas',
      icon: 'fa-plus-circle',
      question: '¿Cómo puedo publicar mi herramienta para alquilarla en PrestaTools?',
      answer: 'Es muy sencillo: 1) Inicia sesión en tu cuenta. 2) Ve a la sección "Alquila Tu Producto". 3) Completa los datos de tu equipo (nombre, modelo, categoría, fotos nítidas y precio de alquiler por día). 4) Una vez aprobada la publicación, tu herramienta estará disponible para que miles de usuarios puedan reservarla y comiences a generar ingresos pasivos.',
      isOpen: false
    },
    {
      id: 'faq3',
      category: 'pagos',
      categoryLabel: 'Pagos y Garantía',
      icon: 'fa-shield',
      question: '¿Qué sucede si una herramienta se daña o se pierde durante el período de alquiler?',
      answer: 'En PrestaTools contamos con un sistema de garantía y verificación de identidad. Al momento del alquiler, el arrendatario acepta los términos de responsabilidad por el cuidado del equipo. En caso de daños por mal uso o extravío, se activa el protocolo de garantía donde el usuario arrendatario debe cubrir los costos de reparación o reposición.',
      isOpen: false
    },
    {
      id: 'faq4',
      category: 'pagos',
      categoryLabel: 'Pagos y Garantía',
      icon: 'fa-tag',
      question: '¿Cómo se establecen los precios de alquiler en PrestaTools?',
      answer: 'Cada propietario establece libremente el precio de alquiler diario de su herramienta. Sugerimos tarifas competitivas basadas en el valor comercial del equipo (habitualmente entre el 3% y el 8% del valor nuevo por día) para asegurar alta demanda y un retorno rápido de tu inversión.',
      isOpen: false
    },
    {
      id: 'faq5',
      category: 'usuarios',
      categoryLabel: 'Usuarios y Registro',
      icon: 'fa-id-card-o',
      question: '¿Cuáles son los requisitos para registrarse como usuario o prestamista?',
      answer: 'Para registrarte solo necesitas ser mayor de 18 años, contar con un documento de identidad válido (RUT en Chile), un correo electrónico y un número de teléfono activo. Para prestar herramientas, solicitamos una verificación adicional de identidad para mantener la máxima seguridad en la comunidad.',
      isOpen: false
    },
    {
      id: 'faq6',
      category: 'prestatools',
      categoryLabel: 'PrestaTools',
      icon: 'fa-map-marker',
      question: '¿Puedo alquilar herramientas en ciudades o regiones diferentes?',
      answer: 'Actualmente nuestro servicio opera en todo el territorio de Chile, conectando usuarios dentro de sus respectivas comunas y regiones (Santiago, Valparaíso, Concepción, etc.). Estamos trabajando continuamente para habilitar entregas y envíos asegurados a nivel nacional.',
      isOpen: false
    },
    {
      id: 'faq7',
      category: 'pagos',
      categoryLabel: 'Pagos y Garantía',
      icon: 'fa-money',
      question: '¿Cuándo y cómo recibo el pago por el alquiler de mi herramienta?',
      answer: 'Los pagos se procesan de forma segura a través de nuestra pasarela de pagos integrada. Una vez que el usuario recibe y confirma la entrega del equipo, los fondos se transfieren a tu cuenta bancaria registrada en un plazo de 24 a 48 horas hábiles.',
      isOpen: false
    },
    {
      id: 'faq8',
      category: 'herramientas',
      categoryLabel: 'Herramientas',
      icon: 'fa-clock-o',
      question: '¿Qué sucede si el usuario no devuelve la herramienta a tiempo?',
      answer: 'Si un usuario excede el tiempo de alquiler acordado sin previa extensión aprobada, se aplican recargos automáticos por cada día adicional de retraso según la tarifa diaria más una comisión por penalización para compensar al propietario.',
      isOpen: false
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  setCategory(catId: string): void {
    this.selectedCategory = catId;
  }

  toggleFaq(faq: FAQItem): void {
    faq.isOpen = !faq.isOpen;
  }

  get filteredFaqs(): FAQItem[] {
    return this.faqs.filter(faq => {
      const matchesCat = this.selectedCategory === 'todos' || faq.category === this.selectedCategory;
      const search = this.searchTerm.trim().toLowerCase();
      const matchesSearch = !search ||
        faq.question.toLowerCase().includes(search) ||
        faq.answer.toLowerCase().includes(search) ||
        faq.categoryLabel.toLowerCase().includes(search);
      return matchesCat && matchesSearch;
    });
  }

}
