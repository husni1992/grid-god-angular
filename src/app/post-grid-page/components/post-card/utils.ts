import { ElementRef } from "@angular/core";

// This is a TS generic fn, will automatically set return type based on input
export function getNextKeyOfObject<T extends object>(
  currentProperty: keyof T,
  properties: Array<keyof T>,
): keyof T {
  if (properties.indexOf(currentProperty) < properties.length - 1) {
    return properties.at(properties.indexOf(currentProperty) + 1) as keyof T;
  }

  return properties[0] as keyof T;
}

export function calculateHeightBasedOnWidthAndPadding(element: ElementRef) {
    const style = getComputedStyle(element.nativeElement);
    const padding = style['paddingTop'];

    return element.nativeElement.offsetWidth - parseInt(padding);
}
