import express, { Request, Response, NextFunction } from "express";
import tripService from "../5-services/trip-service";
import TripModel from "../4-models/trip-model";
import imageHandler from "../2-utils/image-handler";


const router = express.Router();

router.get("/trip", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const trip = await tripService.getAllTrips();
        response.json(trip)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/area", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const trip = await tripService.getAllKindArea();
        response.json(trip)
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/trip", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const trip = new TripModel(request.body);
        const addedTask = await tripService.addTrip(trip);
        response.status(210).json(addedTask);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/trip/:id", async (request: Request, response:Response, next:NextFunction) => {
    try {
        request.body.vacationId = +request.params.vacationId;
        request.body.image = request.files?.image;
        const trip = new TripModel(request.body);
        const updateTrip = await tripService.updateTrip(trip);
        response.json(updateTrip);
    }
    catch (err: any) {
        next(err);
    }
});


router.get("/trip/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = imageHandler.getAbsolutePath(imageName)
        response.sendFile(absolutePath)
    } catch (err: any) {
        next(err)
    }
})

router.delete("/trip/:vacationId([0-9]+)", async (request: Request, response: Response, next: NextFunction)=>{
    try{  
        const vacationId = +request.params.vacationId;
        await tripService.deleteTrip(vacationId);
        response.sendStatus(204)
    }catch(err:any){
        next(err)
    }
})

router.get("/trip-per-trips/:areaId", async(request:Request,response:Response,next:NextFunction)=>{
    try{
        const kindTaskId = +request.params.kindTaskId;
        const trip = await tripService.getTripByTaskId(kindTaskId)
        response.json(trip)
    }catch(err:any){
        next(err)
    }
})

export default router;