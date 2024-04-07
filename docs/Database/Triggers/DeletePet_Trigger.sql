/****** Object:  Trigger [VetClinic].[DeletePet]    Script Date: 2/4/2023 19:19:14 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [VetClinic].[DeletePet]
ON [VetClinic].[OurPets]
INSTEAD OF DELETE 
AS 
BEGIN
	UPDATE VetClinic.Pets
	SET IsDeleted = (SELECT PetID FROM DELETED)
	WHERE VetClinic.Pets.PetID = (SELECT PetID FROM DELETED)
END
GO

