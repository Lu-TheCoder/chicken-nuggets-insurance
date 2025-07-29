const DB = require("../utils/db.v2.utils");

const getDiagnostics = async (search, id, page, perPage) => {
  const db = DB.getInstance();
  const searchQuery = `%${search}%`;
  const offset = (page - 1) * perPage;

  const results = await db.query(
    `SELECT 
         name,
         test_result as result,
         created_at,
         updated_at
         FROM diagnostic_tests WHERE name ILIKE $1 AND user_id=$2 ORDER BY created_at DESC
         LIMIT $3 OFFSET $4;`,
    [searchQuery, id, perPage, offset]
  );

  return results.rows;
};

const getDiagnosticById = async (id, userId) => {
  const db = DB.getInstance();
  const result = await db.query(
    `SELECT 
         name,
         test_result as result,
         created_at,
         updated_at
         FROM diagnostic_tests WHERE id=$1 AND user_id=$2
         `,
    [id, userId]
  );

  if(!(result.rows.length > 0)) {
    throw new Error("user doesnt exist");
  }

  return result.rows;
};

const insertDiagnostic = async (id, name, results) => {
  const db = DB.getInstance();
  const diagnostic = await db.query(
    `INSERT INTO diagnostic_tests (user_id, name, test_result, updated_at)
            VALUES (
                $1,                              
                $2,                              
                $3,                              
                CURRENT_TIMESTAMP               
            )ON CONFLICT ON CONSTRAINT diagnostic_constaints DO NOTHING
            RETURNING *;`,
    [id, name, results]
  );

  return diagnostic.rows;
};

const deleteDiagnostic = async (id, user_id) => {
  const diagnostic = await getDiagnosticById(id, user_id);

  if (!(diagnostic.length > 0)) {
    throw new Error("diagnostic does not exist");
  }

  const db = DB.getInstance();
  const deletedDiagnostic = await db.query(
    `DELETE FROM diagnostic_tests d
		WHERE d.id = $1 AND d.user_id = $2 RETURNING *;`, 
        [id, user_id]
  );

  return deletedDiagnostic.rows;
};

const updateDiagnostic = async (name, testResults, id, userId) => {
    const diagnostic = await getDiagnosticById(id, userId);

    if(!(diagnostic.length > 0)){
      throw new Error("Diagnostic doesnt exist");
    }

    const db = DB.getInstance();
    const result = await db.query(
        `UPDATE diagnostic_tests 
                SET 
                name = $1,
                test_result = $2,
                updated_at = CURRENT_TIMESTAMP 
                WHERE 
                id=$3 AND 
                user_id=$4 RETURNING *;`,
        [name || diagnostic[0].name, testResults || diagnostic[0].test_result, id, userId]
    );

  return result.rows[0];
};

module.exports = {
  getDiagnostics,
  insertDiagnostic,
  deleteDiagnostic,
  getDiagnosticById,
  updateDiagnostic
};
