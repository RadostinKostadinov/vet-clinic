/****** Object:  Trigger [VetClinic].[DeleteClient]    Script Date: 2/4/2023 19:18:20 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [VetClinic].[DeleteClient]
ON [VetClinic].[OurClients] 
INSTEAD OF DELETE 
AS 
BEGIN
	UPDATE VetClinic.Clients 
	SET IsDeleted = (SELECT ClientID FROM DELETED)
	WHERE VetClinic.Clients.ClientID = (SELECT ClientID FROM DELETED)
END
GO

