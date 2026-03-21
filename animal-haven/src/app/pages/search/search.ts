import { Component } from "@angular/core";
import { Card } from "../../components/card/card";

interface AnimalEntry {
    id: number;
    image: string;
    name: string;
    animal: string;
}
@Component({
    selector: 'app-search',
    imports: [Card],
    templateUrl: './search.html',
    styleUrl: './search.css',
})
export class Search {
    // Valores provisionales
    animalTable: AnimalEntry[] = [
        { id: 1, image: "images/dog1.jpg", name: "Todd", animal: "Dog"},
        { id: 2, image: "images/dog2.jpg", name: "Lily", animal: "Dog"},
        { id: 3, image: "images/cat1.jpg", name: "Luna", animal: "Cat"},
        { id: 4, image: "images/cat2.jpg", name: "Rudolf", animal: "Cat"},
        { id: 5, image: "images/parrot.jpg", name: "Cole", animal: "Parrot"},
    ]
}

