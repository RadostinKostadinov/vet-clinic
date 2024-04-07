/****** Object:  Table [VetClinic].[Clients]    Script Date: 2/4/2023 19:14:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [VetClinic].[Clients](
	[ClientId] [int] IDENTITY(100,1) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](500) NOT NULL,
	[Firstname] [nvarchar](50) NOT NULL,
	[Lastname] [nvarchar](50) NOT NULL,
	[Phone] [varchar](20) NOT NULL,
	[Address] [nvarchar](100) NOT NULL,
	[IsDeleted] [int] NOT NULL,
 CONSTRAINT [PK_VetClinic.Clients] PRIMARY KEY CLUSTERED 
(
	[ClientId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [Clients_unique_username] UNIQUE NONCLUSTERED 
(
	[Username] ASC,
	[IsDeleted] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [VetClinic].[Clients] ADD  CONSTRAINT [DF_Clients_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [VetClinic].[Clients]  WITH CHECK ADD  CONSTRAINT [FK_Clients_Pets] FOREIGN KEY([ClientId])
REFERENCES [VetClinic].[Clients] ([ClientId])
GO

ALTER TABLE [VetClinic].[Clients] CHECK CONSTRAINT [FK_Clients_Pets]
GO

