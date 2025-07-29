const { Router } = require("express");
const AuthMiddleware = require("../middleware/auth.middleware");
const { serverError, ok, notFound } = require("../utils/http.utils");
const { getErrorMessage } = require("../utils/error.utils");
const {
  getDestinations,
  deleteDestination,
  getDestinationById,
  insertDestination,
  updateDestination,
} = require("../services/destination.services");

const DestinationRouter = Router();
const Middleware = [AuthMiddleware]; //*purpose: if there are more 'guard' middleware*

//*GET*
//*/GET ALL DESTINATIONS by searching*
DestinationRouter.get("/", Middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
        search = '',
        page = '1',
        perPage = '10'
    } = req.query || {};
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const perPageNumber = Math.max(1, parseInt(perPage, 10) || 10);
    const searchTerm = typeof search === "string" ? search : "";
    const result = await getDestinations(
      searchTerm,
      userId,
      pageNumber,
      perPageNumber
    );
    ok(res, result);
  } catch (error) {
    serverError(res, getErrorMessage(error));
  }
});

//*/GET DESTINATION BY ID*
DestinationRouter.get("/:id", Middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const destinationId = req.params.id;
    const destination = await getDestinationById(destinationId, userId);
    ok(res, destination);
  } catch (error) {
    serverError(res, getErrorMessage(error));
  }
});

//*POST*
//*/INSERT THE DESTINATION*
DestinationRouter.post("/", Middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { location, risk_level } = req.body;
    const destination = await insertDestination(userId, location, risk_level);
    ok(res, destination);
  } catch (error) {
    serverError(res, getErrorMessage(error));
  }
});

//*DELETE*
//*/DELETE THE DESTINATION*
DestinationRouter.delete("/:id", Middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const destinationId = req.params.id;
    const result = await deleteDestination(destinationId, userId);
    ok(res, result);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message == "Destination does not exist") {
        notFound(res, error.message);
      }
    } else {
      serverError(res, getErrorMessage(error));
    }
  }
});

//*PATCH*
DestinationRouter.patch('/:id', Middleware, async (req, res) => {
    try {
        const destinationId = req.params.id;
        const userId = req.user.id;
        const { location, risk_level } = req.body;
        const updatedDestination = await updateDestination(location, risk_level, destinationId, userId);
        ok(res, updatedDestination);
    } catch (error) {
        serverError(res, getErrorMessage(error));
    }
});

module.exports = {
    DestinationRouter
}