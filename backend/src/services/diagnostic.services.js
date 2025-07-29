const { query } = require("../utils/db.utils");

const getDiagnostics = async (search, id, page, perPage) => {
  const searchQuery = `%${search}%`;
  const offset = (page - 1) * perPage;

  const results = await query(
    `SELECT 
         name,
         test_result as result,
         created_at,
         updated_at
         FROM diagnostic_tests WHERE name ILIKE $1 AND user_id=$2 ORDER BY created_at DESC
         LIMIT $3 OFFSET $4;`,
    [searchQuery, id, perPage, offset]
  );

  return results;
};

const getDiagnosticById = async (id, userId) => {
  const result = await query(
    `SELECT 
         name,
         test_result as result,
         created_at,
         updated_at
         FROM diagnostic_tests WHERE id=$1 AND user_id=$2
         `,
    [id, userId]
  );

  if(!(result.length >0)) {throw new Error("user doesnt exist")}

  return result;
};

const insertDiagnostic = async (id, name, results) => {
  const diagnostic = await query(
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

  return diagnostic;
};

const deleteDiagnostic = async (id, user_id) => {
  const diagnostic = await getDiagnosticById(id, user_id);

  if (!(diagnostic.length > 0)) {
    throw new Error("diagnostic does not exist");
  }

  const deletedDiagnostic = await query(
    `DELETE FROM diagnostic_tests d
		WHERE d.id = $1 AND d.user_id = $2 RETURNING *;`, 
        [id, user_id]
  );

  return deletedDiagnostic;
};

const updateDiagnostic = async (name, testResults, id, userId) => {
    const diagnostic = await getDiagnosticById(id, userId);

    if(!(diagnostic.length > 0)){throw new Error("Diagnostic doesnt exist")}

    const result = await query(
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

  return result[0];
};

module.exports = {
  getDiagnostics,
  insertDiagnostic,
  deleteDiagnostic,
  getDiagnosticById,
  updateDiagnostic
};
