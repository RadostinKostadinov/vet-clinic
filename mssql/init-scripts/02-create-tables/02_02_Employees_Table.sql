/****** Object:  Table [VetClinic].[Employees]    Script Date: 2/4/2023 19:15:03 ******/
USE [VetClinic];
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [VetClinic].[Employees](
	[EmployeeId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](50) NOT NULL,
	[Password] [char](60) NOT NULL,
	[Firstname] [varchar](50) NOT NULL,
	[Lastname] [varchar](50) NOT NULL,
	[IsDeleted] [int] NULL,
 CONSTRAINT [PK_VetClinic.Employees] PRIMARY KEY CLUSTERED 
(
	[EmployeeId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [Username_unique] UNIQUE NONCLUSTERED 
(
	[Username] ASC,
	[IsDeleted] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [VetClinic].[Employees] ADD  CONSTRAINT [DF_Employees_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

