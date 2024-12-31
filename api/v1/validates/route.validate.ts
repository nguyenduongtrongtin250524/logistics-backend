import { NextFunction, Request, Response } from "express";

// [POST] /api/v1/routes/optimize
const optimizes = (req: Request, res: Response, next: NextFunction) => {
  try {
    const pickupLocations = req.body.pickupLocations;
    const deliveryLocations = req.body.deliveryLocations;

    if (
      !pickupLocations ||
      !deliveryLocations
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing required information."
      });
    }

    if (
      (
        typeof pickupLocations !== "object" || 
        pickupLocations.length !== 2 ||
        typeof pickupLocations[0] !== "number" ||
        typeof pickupLocations[1] !== "number"
      ) ||
      (
        typeof deliveryLocations !== "object" || 
        deliveryLocations.length !== 2 ||
        typeof deliveryLocations[0] !== "number" ||
        typeof deliveryLocations[1] !== "number"
      )
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing datatype."
      });
    }

    return next();
  } catch {
    return res.status(500).json({
      status: false,
      message: "Something went wrong."
    });
  }
}

const routeValidate = {
  optimizes
};
export default routeValidate;