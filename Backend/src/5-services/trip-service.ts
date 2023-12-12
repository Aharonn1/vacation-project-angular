import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError } from "../4-models/client-errors";
import TripModel from "../4-models/trip-model";
import imageHandler from "../2-utils/image-handler";

async function getAllTrips(): Promise<TripModel[]> {
    const sql = `SELECT * FROM trip ORDER BY startDate`;
    const vacation = await dal.execute(sql)
    return vacation;
}

async function getAllKindArea(): Promise<TripModel[]> {
    const sql = `SELECT * FROM area`;
    const vacation = await dal.execute(sql)
    return vacation;
}

async function getTripByTaskId(areaId: number): Promise<TripModel[]> {
    const sql = 'SELECT * FROM trip WHERE areaId = ?';
    const area = await dal.execute(sql, areaId);
    return area;
}

async function addTrip(trip: TripModel): Promise<TripModel> {
    trip.imageName = await imageHandler.saveImage(trip.image);
    const sql = "INSERT INTO trip VALUES(DEFAULT,?,?,?,?,?,?,?)";
    const result: OkPacket = await dal.execute(sql, trip.areaId, trip.destination, trip.description
        , trip.startDate, trip.endDate, trip.price, trip.imageName);
    trip.vacationId = result.insertId;
    delete trip.image;
    return trip;
}

async function updateTrip(vacation: TripModel): Promise<TripModel> {

    vacation.imageName = await getImageNameFromDB(vacation.vacationId)
    if (vacation.image) {
        vacation.imageName = await imageHandler.updateImage(vacation.image, vacation.imageName)

    }
    const sql = `UPDATE trip SET 
        destination = ?,
        description = ?,
        startDate = ?,
        endDate = ?,
        price = ?,
        imageName = ?
        WHERE vacationId = ?`;
    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description,
        vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.vacationId);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);
    delete vacation.image;
    return vacation;
}


async function deleteTrip(id: number): Promise<void> {
    const sql = "DELETE FROM trip WHERE vacationId = ?";
    const result: OkPacket = await dal.execute(sql, id);
    if (result.affectedRows === 0) throw new ResourceNotFoundError(id)

}

async function getImageNameFromDB(id: number): Promise<string> {
    const sql = "SELECT imageName FROM trip WHERE vacationId = ?"

    const vacations = await dal.execute(sql, id);

    const vacation = vacations[0];

    if (!vacation) return null;

    return vacations.imageName;
}

export default {
    getAllTrips,
    getAllKindArea,
    getTripByTaskId,
    addTrip,
    updateTrip,
    deleteTrip
}


