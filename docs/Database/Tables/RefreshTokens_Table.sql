/****** Object:  Table [VetClinic].[RefreshTokens]    Script Date: 2/4/2023 19:15:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [VetClinic].[RefreshTokens](
	[username] [nvarchar](50) NOT NULL,
	[refreshToken] [varchar](max) NOT NULL,
	[expiresAt] [datetime] NOT NULL,
	[role] [varchar](20) NOT NULL,
 CONSTRAINT [PK_RefreshTokens] PRIMARY KEY CLUSTERED 
(
	[username] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

