import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
 selector: '[bsDelay]'
})
export class DelayDirective implements OnInit {
 @Input() bsDelay;

 constructor(private templateRef: TemplateRef<any>,
             private viewContainerRef: ViewContainerRef) { }
 ngOnInit() {
   setTimeout(() => {
     this.viewContainerRef.createEmbeddedView(this.templateRef);
   }, this.bsDelay);
 }
}
