/****** Object:  View [VetClinic].[OurClients]    Script Date: 2/4/2023 19:17:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [VetClinic].[OurClients] (ClientID, Username, Password, Firstname, Lastname, Phone, Address)
AS SELECT ClientID, Username, Password, Firstname, Lastname, Phone, Address
FROM [VetClinic].[Clients]
WHERE IsDeleted=0;
GO

