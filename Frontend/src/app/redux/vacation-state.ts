import { createStore } from "redux";
import VacationModel from "../models/vacation.model";

// 1 state
export class VacationState {
    vacations: VacationModel[] = [];
}

//2 Action Type
export enum VacationActionType {
    FetchVacation = "FetchVacation",
    AddVacation = "AddVacation",
    DeleteVacation = "DeleteVacation"
}

//3 Action 

export interface VacationAction {
    type: VacationActionType;
    payload: any;
}

// 4 Reducer 
export function vacationReducer(currentState = new VacationState(), action: VacationAction): VacationState {
    const newState = { ...currentState };

    switch (action.type) {

        case VacationActionType.FetchVacation:
            newState.vacations = action.payload;
            break;

        case VacationActionType.AddVacation:
            if (newState.vacations.length > 0) {

                newState.vacations.push(action.payload);
            }
            break;
        case VacationActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1)
            }
            break;
    }
    return newState
}

// 5 .store

export const vacationStore = createStore(vacationReducer)