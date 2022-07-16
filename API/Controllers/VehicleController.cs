using Microsoft.AspNetCore.Mvc;
using API.Handlers;
using API.Models;
using Microsoft.AspNetCore.SignalR;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class VehicleController : ControllerBase
{
    private readonly IHubContext<CellHub> _hub;
    public  VehicleController(IHubContext<CellHub> hub)
    {
        _hub = hub;
    }
    private VehicleHandler _VehicleHandler = new VehicleHandler();

    [Route("/vehicles")]
    [HttpGet]
    public IEnumerable<Vehicle> Get()
    {
        return this._VehicleHandler.GetVehicles();
    }

    [Route("/vehicles")]
    [HttpPost]
    public IEnumerable<Vehicle> Post([FromBody]Vehicle[] vic)
    {
        return this._VehicleHandler.PostVehicles(vic, _hub);
    }
}
