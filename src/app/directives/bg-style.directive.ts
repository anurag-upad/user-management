import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appBgStyle]'
  })
export class BgStyleDirective implements OnInit{

    constructor(private renderer : Renderer2, private elementRef : ElementRef){}

    ngOnInit (){
        // 1. basic approach
        //this.elementRef.nativeElement.style.backgroundColor = 'green';
        // 2. using Renderer - better solution
        //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
        // 3. Using HostListener and HostBinding decorators
    }

    @HostBinding('style.backgroundColor') backgroundColor : string = 'transparent';

    //we can listen to any DOM event here and access any event property this directive sits on
    @HostListener('mouseover', ['$event']) mouseHover(event : Event){
        //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
        this.backgroundColor = 'blue';
        console.log(event);
    }

    @HostListener('mouseleave', ['$event.target']) mouseLeave(target){
        //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
        this.backgroundColor = 'transparent';
        console.log(target);
    }


}