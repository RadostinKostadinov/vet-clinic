/****** Object:  View [VetClinic].[OurEmployees]    Script Date: 2/4/2023 19:17:20 ******/
USE [VetClinic];
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [VetClinic].[OurEmployees]
AS
SELECT EmployeeId, Username, Password, Firstname, Lastname
FROM     VetClinic.Employees
WHERE  (IsDeleted = 0)
GO

