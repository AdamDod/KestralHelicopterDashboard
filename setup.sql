IF OBJECT_ID('[Vehicle]') IS NOT NULL
DROP TABLE [Vehicle]
GO

Create Table [Vehicle]
(
    [index] int PRIMARY KEY,
    [Registration] [NVARCHAR] (50),
    [Type] [NVARCHAR] (50),
    [Contract] [NVARCHAR] (50),
    [Location] [NVARCHAR] (50),
    [Config] [NVARCHAR] (500),
    [TimeToReady] int,
    [MR] [NVARCHAR] (50),
    [Maintenance] [NVARCHAR] (50),
    [Notes] [NVARCHAR] (500),

);
GO

INSERT INTO [Vehicle] ([index],[Registration], [Type], [Contract],[Location],[Config],[TimeToReady],[MR],[Maintenance],[Notes])
VALUES
    (1,'VH-KHW','Bell 412', 'HT-333','H1','In Maintenance', -1,'Invalid','30 Day','AWAITING FUEL NOZZLES AWAITING 2 SPINDLES AWAITING RAPPEL GEAR'),
    (2,'VH-ESB','Bell 412', 'HT-248','H3','WINCH U/S NO TANK BUBBLE DOOR&HOOK', 0,'30 SEPT 22','30 Day 06/08/22','AWAITING NEW HOIST SQUIB'),
    (3,'VH-KHU','Bell 412', 'HT-248','H1','FLOAT GEAR CARGO HOOK 5 FWD PAX SEATS', 1,'To be Issued','30 Day Full','')

SELECT * FROM [Vehicle]

DELETE [Vehicle] FROM [Vehicle]
-- Server=tcp:kestral.database.windows.net,1433;Initial Catalog=KestralHelicopters;Persist Security Info=False;User ID=adamadmin;Password=Move1234!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;


ALTER TABLE [Vehicle] ADD [StatusColour] [NVARCHAR] (50);
ALTER TABLE [Vehicle] ADD [HoursShown] bit;

UPDATE [Vehicle] SET [HoursShown] = 1;
UPDATE [Vehicle] SET [StatusColour] = 'yellow';