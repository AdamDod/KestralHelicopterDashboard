----------------------------Counter-------------------------
------------------------------------------------------------

IF OBJECT_ID('CountBy1') IS NOT NULL
    DROP SEQUENCE Count.CountBy1;

IF OBJECT_ID('Count') IS NOT NULL
    DROP SCHEMA Count;

Create SCHEMA Count;
GO

CREATE SEQUENCE Count.CountBy1
    Start WITH 1000
    INCREMENT BY 1;
GO


------------------------------------------------------------
----------------------ADD GAME--------------------
------------------------------------------------------------
IF OBJECT_ID('ADD_Vehicle') IS NOT NULL
    DROP PROCEDURE ADD_Vehicle;
GO

CREATE PROCEDURE ADD_Vehicle
    @pRegistration [NVARCHAR] (500),
    @pType [NVARCHAR] (500),
    @pContract [NVARCHAR] (500),
    @pLocation [NVARCHAR] (500),
    @pConfig [NVARCHAR] (500),
    @pTimeToReady int,
    @pMR [NVARCHAR] (500),
    @pMaintenance [NVARCHAR] (500),
    @pNotes [NVARCHAR] (500),
    @pStatusColour [NVARCHAR] (50),
    @pHoursShown [bit]
AS
BEGIN
    DECLARE @pVehicleID BIGINT;
    SET @pVehicleID = NEXT VALUE FOR Count.CountBy1;
    BEGIN TRY
        INSERT INTO [Vehicle] ([index],[Registration], [Type], [Contract],[Location],[Config],[TimeToReady],[MR],[Maintenance],[Notes],[StatusColour],[HoursShown])
    VALUES 
        (@pVehicleID,@pRegistration,@pType,@pContract,@pLocation,@pConfig,@pTimeToReady,@pMR,@pMaintenance,@pNotes,@pStatusColour,@pHoursShown)
    END TRY
    BEGIN CATCH
    END CATCH
END
    RETURN @pVehicleID
GO
