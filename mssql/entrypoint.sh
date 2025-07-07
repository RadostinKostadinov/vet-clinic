#!/bin/bash
# Wait for SQL Server to start
sleep 30s

# Check if 'VetClinic.Clients' table exists
# The 'Clients' table is a general table for the application. If it exists, this means that the application scripts have already been run.
TABLE_EXISTS=$(/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -C -d VetClinic -h -1 -Q "SET NOCOUNT ON; IF OBJECT_ID('VetClinic.Clients', 'U') IS NOT NULL SELECT 1 ELSE SELECT 0" | tr -d '[:space:]')

if [ "$TABLE_EXISTS" -eq 1 ]; then
  echo "Table VetClinic.Clients exists. Skipping initialization scripts."
else
  echo "Table VetClinic.Clients does not exist. Running initialization scripts..."
  find /opt/mssql-init/init-scripts/ -type f -name '*.sql' | sort | while read filename; do
    echo "Executing: $filename"
    /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -C -d master -i "$filename"
    if [ $? -eq 0 ]; then
      echo "Script $filename executed successfully"
    else
      echo "Error executing $filename"
    fi
  done
fi
