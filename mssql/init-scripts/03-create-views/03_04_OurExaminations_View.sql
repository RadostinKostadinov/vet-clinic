/****** Object:  View [VetClinic].[OurExaminations]    Script Date: 2/4/2023 19:17:38 ******/
USE [VetClinic];
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [VetClinic].[OurExaminations]
AS
SELECT ExaminationId, Pet, Employee, ExaminationDate, Conclusion, Occasion, Duration
FROM     VetClinic.Examinations
WHERE  (IsDeleted = 0)
GO

