const express = require('express');
const cors = require('cors');
const mysql = require('mysql'); // Require mysql module

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Create a connection to your database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rooter',
  database: 'ptixiaki'
});

app.post("/create-table", (req, res) => {
  const { tableName } = req.body;
  const sql = `CREATE TABLE ${tableName} (id INT);`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error creating table:', error);
      res.status(500).json({ error: 'Error creating table' });
      return;
    }
    console.log(`Table ${tableName} created successfully.`);
    res.json({ message: `Table ${tableName} created successfully.` });
  });
});


app.post("/add-column", (req, res) => {
  const { tableName, columnName, columnType } = req.body;
  const sql = `ALTER TABLE ${tableName} ADD ${columnName} ${columnType};`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error adding column:', error);
      res.status(500).json({ error: 'Error adding column' });
      return;
    }
    console.log(`Column ${columnName} added to table ${tableName} successfully.`);
    res.json({ message: `Column ${columnName} added to table ${tableName} successfully.` });
  });
});

app.post("/delete-column", (req, res) => {
  const { tableName, columnName } = req.body;
  const sql = `ALTER TABLE ${tableName} DROP COLUMN ${columnName};`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error deleting column:', error);
      res.status(500).json({ error: 'Error deleting column' });
      return;
    }
    console.log(`Column ${columnName} deleted from table ${tableName} successfully.`);
    res.json({ message: `Column ${columnName} deleted from table ${tableName} successfully.` });
  });
});

app.post("/delete-table", (req, res) => {
  const { tableName } = req.body;
  const sql = `DROP TABLE ${tableName};`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error deleting table:', error);
      res.status(500).json({ error: 'Error deleting table' });
      return;
    }
    console.log(`Table ${tableName} deleted successfully.`);
    res.json({ message: `Table ${tableName} deleted successfully.` });
  });
});

app.get("/get-tables", (req, res) => {
  const sql = "SHOW TABLES";
  
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Error getting tables:', error);
      res.status(500).json({ error: 'Error getting tables' });
      return;
    }
    const tables = results.map(result => result[`Tables_in_${connection.config.database}`]);
    const filteredTables = tables.filter(tableName => tableName !== 'GeneralProp');

    res.json({ tables: filteredTables });
  });
}); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});