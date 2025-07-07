/****** Object:  Trigger [VetClinic].[DeleteExamination]    Script Date: 2/4/2023 19:18:58 ******/
USE [VetClinic];
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [VetClinic].[DeleteExamination]
ON [VetClinic].[OurExaminations]
INSTEAD OF DELETE 
AS 
BEGIN
	UPDATE VetClinic.Examinations
	SET IsDeleted = (SELECT ExaminationId FROM DELETED)
	WHERE VetClinic.Examinations.ExaminationId = (SELECT ExaminationId FROM DELETED)
END
GO

