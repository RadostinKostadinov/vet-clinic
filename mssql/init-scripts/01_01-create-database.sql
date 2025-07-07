USE master;
GO

-- Create the VetClinic database if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'VetClinic')
BEGIN
    CREATE DATABASE VetClinic;
END
GO

