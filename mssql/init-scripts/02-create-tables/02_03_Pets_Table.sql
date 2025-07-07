/****** Object:  Table [VetClinic].[Pets]    Script Date: 2/4/2023 19:15:26 ******/
USE [VetClinic];
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [VetClinic].[Pets](
	[PetId] [int] IDENTITY(1,1) NOT NULL,
	[Type] [nvarchar](50) NOT NULL,
	[Breed] [nvarchar](50) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Birthdate] [datetime] NOT NULL,
	[Sex] [nvarchar](50) NOT NULL,
	[Info] [nvarchar](2000) NOT NULL,
	[Owner] [int] NOT NULL,
	[IsDeleted] [int] NOT NULL,
 CONSTRAINT [PK_VetClinic.Pets] PRIMARY KEY CLUSTERED 
(
	[PetId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [VetClinic].[Pets] ADD  CONSTRAINT [DF_Pets_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

