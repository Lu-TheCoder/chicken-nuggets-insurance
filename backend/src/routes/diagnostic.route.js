const { Router } = require("express");
const AuthMiddleware = require("../middleware/auth.middleware");
const { serverError, ok, notFound } = require("../utils/http.utils");
const { getErrorMessage } = require("../utils/error.utils");
const {
  getDiagnostics,
  deleteDiagnostic,
  getDiagnosticById,
  insertDiagnostic,
  updateDiagnostic,
} = require("../services/diagnostic.services");

const DiagnosticRouter = Router();
const Middleware = [AuthMiddleware]; //purpose: if there are more 'guard' middleware

//GET
///GET ALL DIAGNOSTICS by searching
DiagnosticRouter.get("/", Middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
        search = '', 
        page = '1', 
        perPage = '10' 
    } = req.body || {};
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const perPageNumber = Math.max(1, parseInt(perPage, 10) || 10);
    const searchTerm = typeof search === "string" ? search : "";

    const result = await getDiagnostics(
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

///GET DIAG BY ID
DiagnosticRouter.get("/:id", Middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const diagnosticId = req.params.id;

    const diagnostic = await getDiagnosticById(diagnosticId, userId);

    ok(res, diagnostic);
  } catch (error) {
    serverError(res, getErrorMessage(error));
  }
});

//POST
///INSERT THE DIAGNOSTICS
DiagnosticRouter.post("/", Middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, results } = req.body;

    const diagnostic = await insertDiagnostic(userId, name, results);

    ok(res, diagnostic);
  } catch (error) {
    serverError(res, getErrorMessage(error));
  }
});

//DELETE
///DELETE THE DIAGNOSTICS
DiagnosticRouter.delete("/:id", Middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const diagnosticId = req.params.id;

    const result = await deleteDiagnostic(diagnosticId, userId);
    ok(res, result)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message == "Asset does not exist") {
        notFound(res, error.message);
      }
    } else {
      serverError(res, getErrorMessage(error));
    }
  }
});

//PATCH 
DiagnosticRouter.patch('/:id', Middleware, async (req, res) => {
    try {
        const diagnosticId = req.params.id;
        const userId = req.user.id;
        const {name, result} = req.body;

        const updatedDiagnostic = await updateDiagnostic(name, result, diagnosticId, userId);

        ok(res, updatedDiagnostic);
    } catch (error) {
        serverError(res, getErrorMessage(error));
    }
});


module.exports = {
    DiagnosticRouter
}