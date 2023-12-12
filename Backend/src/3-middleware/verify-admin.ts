import { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";
import { AuthenticationError } from "../4-models/client-errors";

async function verifyAdmin(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        // Verify token - crash if not valid:
       const isAdmin =  await cyber.verifyToken(request);

       if(!isAdmin){
        next(new AuthenticationError("you are not admin"));
       }
        // If valid - continue:
        next();
    }
    catch (err: any) {
        next(err);
    }

}

export default verifyAdmin;