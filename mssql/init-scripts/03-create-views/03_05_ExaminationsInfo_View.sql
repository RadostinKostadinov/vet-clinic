/****** Object:  View [VetClinic].[ExaminationsInfo]    Script Date: 2/4/2023 19:16:49 ******/
USE [VetClinic];
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [VetClinic].[ExaminationsInfo] AS
SELECT OurExaminations.ExaminationId, OurClients.Firstname as ClientName, OurPets.Name as PetName, OurExaminations.ExaminationDate,
OurExaminations.Duration, 
Employees.Username as Employee, OurExaminations.Occasion
From VetClinic.OurExaminations, VetClinic.OurPets, VetClinic.OurClients, VetClinic.Employees
WHERE VetClinic.OurExaminations.Pet = VetClinic.OurPets.PetId 
AND VetClinic.OurPets.Owner = VetClinic.OurClients.ClientId
AND VetClinic.OurExaminations.Employee = Employees.EmployeeId
GO

