const { query } = require("../utils/db.utils");

// const getDestinations = async (search, id, page, perPage) => {
//   const searchQuery = `%${search}%`;
//   const offset = (page - 1) * perPage;
//   const results = await query(
//     `SELECT
//          id,
//          location,
//          risk_level,
//          last_checked_at,
//          created_at,
//          updated_at
//          FROM monitored_destinations WHERE location ILIKE $1 AND user_id=$2 ORDER BY created_at DESC
//          LIMIT $3 OFFSET $4;`,
//     [searchQuery, id, perPage, offset]
//   );
//   return results;
// };

const getDestinationById = async (id, userId) => {
  const result = await query(
    `SELECT
         id,
         location,
         risk_level,
         last_checked_at,
         created_at,
         updated_at
         FROM monitored_destinations WHERE id=$1;`,
    [id, userId]
  );
  if(!(result.length > 0)) {
    throw new Error("Destination does not exist");
  }
  return result;
};

const insertDestination = async (userId, location, riskLevel) => {
  const destination = await query(
    `INSERT INTO monitored_destinations (user_id, location, risk_level, updated_at)
            VALUES (
                $1,                              
                $2,                              
                $3,                              
                CURRENT_TIMESTAMP              
            )
            ON CONFLICT ON CONSTRAINT monitored_constaints DO NOTHING
            RETURNING *;`,
    [userId, location, riskLevel]
  );
  return destination;
};

const deleteDestination = async (id, user_id) => {
  const destination = await getDestinationById(id, user_id);
  if (!(destination.length > 0)) {
    throw new Error("Destination does not exist");
  }
  const deletedDestination = await query(
    `DELETE FROM monitored_destinations d
    WHERE d.id = $1 AND d.user_id = $2 RETURNING *;`,
    [id, user_id]
  );
  return deletedDestination;
};

const updateDestination = async (location, riskLevel, id, userId) => {
    const destination = await getDestinationById(id, userId);
    if(!(destination.length > 0)){
        throw new Error("Destination does not exist");
    }
    const result = await query(
        `UPDATE monitored_destinations
                SET
                location = $1,
                risk_level = $2,
                updated_at = CURRENT_TIMESTAMP
                WHERE
                id=$3 AND
                user_id=$4 RETURNING *;`,
        [location || destination[0].location, riskLevel || destination[0].risk_level, id, userId]
    );
  return result[0];
};

//add for checking a destination

module.exports = {
  getDestinations,
  insertDestination,
  deleteDestination,
  getDestinationById,
  updateDestination
};