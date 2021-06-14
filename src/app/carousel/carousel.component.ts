import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  slideIndex = 1;
  banners = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getBanners().subscribe((data) => {
      this.banners = data;
      setTimeout(() => {
        this.showSlides(this.slideIndex);
      }, 0)
    });
  }

  plusSlides(n) {
    this.slideIndex += n
    this.showSlides(this.slideIndex);
  }

  currentSlide(n) {
    this.slideIndex = n
    this.showSlides(this.slideIndex);
  }

  showSlides(n) {
    let i;
    let slides: any = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
  }

}
