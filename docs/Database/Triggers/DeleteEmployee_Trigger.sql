/****** Object:  Trigger [VetClinic].[DeleteEmployee]    Script Date: 2/4/2023 19:18:38 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [VetClinic].[DeleteEmployee]
ON [VetClinic].[OurEmployees] 
INSTEAD OF DELETE 
AS 
BEGIN
	UPDATE VetClinic.Employees 
	SET IsDeleted = (SELECT EmployeeId FROM DELETED)
	WHERE VetClinic.Employees.EmployeeId = (SELECT EmployeeId FROM DELETED)
END
GO

