import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-card',
    imports: [],
    templateUrl: './card.html',
    styleUrl: './card.css',
})
export class Card {
    @Input() data: any;
    @Output() viewDetails = new EventEmitter<any>();
}