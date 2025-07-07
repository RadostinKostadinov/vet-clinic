/****** Object:  View [VetClinic].[OurPets]    Script Date: 2/4/2023 19:17:50 ******/
USE [VetClinic];
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [VetClinic].[OurPets]
AS
SELECT PetId, Type, Breed, Name, Birthdate, Sex, Info, Owner
FROM     VetClinic.Pets
WHERE  (IsDeleted = 0)
GO

