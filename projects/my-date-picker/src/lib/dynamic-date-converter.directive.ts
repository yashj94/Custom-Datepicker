import { Directive, Input, HostListener, ElementRef, Renderer2, OnInit, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { DatePickerComponent } from './date-picker/date-picker.component';

@Directive({
  selector: '[dynamicDateConverter]'
})
export class DynamicDateConverterDirective implements OnInit {
  @Input() dateFormat: string = 'DD-MM-YYYY'; // Default format

  private datePickerComponentRef: ComponentRef<DatePickerComponent> | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.setupDatePicker();
  }

  private setupDatePicker() {
    const inputElement = this.el.nativeElement;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DatePickerComponent);

    this.datePickerComponentRef = this.viewContainerRef.createComponent(componentFactory);
    this.datePickerComponentRef.instance.format = this.dateFormat;

    // Position the DatePickerComponent relative to the input element
    this.renderer.listen(inputElement, 'focus', () => {
      this.datePickerComponentRef!.instance.showCalendar = true;
    });

    // Example positioning, adjust as needed
    this.renderer.setStyle(this.datePickerComponentRef.location.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.datePickerComponentRef.location.nativeElement, 'top', `${inputElement.offsetTop + inputElement.offsetHeight}px`);
    this.renderer.setStyle(this.datePickerComponentRef.location.nativeElement, 'left', `${inputElement.offsetLeft}px`);
  }
}
