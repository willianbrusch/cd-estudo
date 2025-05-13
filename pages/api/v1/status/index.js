import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const version = await database.query("SELECT version();");
  const maxConnections = await database.query("SHOW max_connections;");
  const openedConnections = await database.query(
    "SELECT COUNT(*) FROM pg_stat_activity;",
  );

  response.status(200).json({
    updated_at: updatedAt,
    version: version.rows[0].version.slice(11, 15),
    max_connections: maxConnections.rows[0]["max_connections"],
    opened_connections: openedConnections.rows[0]["count"],
  });
}

export default status;
