/****** Object:  Table [VetClinic].[Examinations]    Script Date: 2/4/2023 19:15:15 ******/
USE [VetClinic];
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [VetClinic].[Examinations](
	[ExaminationId] [int] IDENTITY(1,1) NOT NULL,
	[Pet] [int] NOT NULL,
	[Employee] [int] NULL,
	[ExaminationDate] [datetime] NOT NULL,
	[Occasion] [nvarchar](200) NOT NULL,
	[Conclusion] [nvarchar](2000) NOT NULL,
	[Duration] [int] NOT NULL,
	[IsDeleted] [int] NULL,
 CONSTRAINT [PK_VetClinic.Examinations] PRIMARY KEY CLUSTERED 
(
	[ExaminationId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [VetClinic].[Examinations] ADD  CONSTRAINT [DF_Examinations_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [VetClinic].[Examinations]  WITH CHECK ADD  CONSTRAINT [FK_VetClinic.Examinations_VetClinic.Employees] FOREIGN KEY([Employee])
REFERENCES [VetClinic].[Employees] ([EmployeeId])
ON DELETE SET NULL
GO

ALTER TABLE [VetClinic].[Examinations] CHECK CONSTRAINT [FK_VetClinic.Examinations_VetClinic.Employees]
GO

ALTER TABLE [VetClinic].[Examinations]  WITH CHECK ADD  CONSTRAINT [FK_VetClinic.Examinations_VetClinic.Pets] FOREIGN KEY([Pet])
REFERENCES [VetClinic].[Pets] ([PetId])
GO

ALTER TABLE [VetClinic].[Examinations] CHECK CONSTRAINT [FK_VetClinic.Examinations_VetClinic.Pets]
GO

