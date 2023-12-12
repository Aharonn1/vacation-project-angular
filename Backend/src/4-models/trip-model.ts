import { UploadedFile } from "express-fileupload";

class TripModel {
    vacationId: number;
    areaId: number;
    destination: string;
    description: string;
    startDate: string;
    endDate: string
    price: number;
    image: UploadedFile;
    imageName: string;

    constructor(trip: TripModel) {
        this.vacationId = trip.vacationId;
        this.areaId = trip.areaId;
        this.destination = trip.destination;
        this.description = trip.description;
        this.startDate = trip.startDate;
        this.endDate = trip.endDate;
        this.price = trip.price;
        this.image = trip.image;
        this.imageName = trip.imageName;
    }
}
export default TripModel