using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace JudeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceAutocomplete : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _googleApiKey = "AIzaSyAhbtJE_nRdDN9DLlM8i38m9QtbNbZr0Uw"; 

        public PlaceAutocomplete(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchLocation([FromQuery] string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                return BadRequest("Search input is required.");

            string url = $"https://maps.googleapis.com/maps/api/place/autocomplete/json?input={input}&key={_googleApiKey}";

            HttpResponseMessage response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Error fetching data from Google API");

            string result = await response.Content.ReadAsStringAsync();
            return Ok(result);
        }

        [HttpGet("detailsearch")]
        public async Task<IActionResult> SearchLocationDetails([FromQuery] string placeid)
        {
            if (string.IsNullOrWhiteSpace(placeid))
                return BadRequest("Search input is required.");

            string url = $"https://maps.googleapis.com/maps/api/place/details/json?place_id={placeid}&key={_googleApiKey}";

            HttpResponseMessage response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Error fetching data from Google API");

            string result = await response.Content.ReadAsStringAsync();
            return Ok(result);
        }

        [HttpGet("locationbycods")]
        public async Task<IActionResult> CodLocation([FromQuery] double lat, [FromQuery] double lng)
        {
            string url = $"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&key={_googleApiKey}";

            HttpResponseMessage response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Error fetching data from Google API");

            string result = await response.Content.ReadAsStringAsync();
            using var jsonDoc = JsonDocument.Parse(result);
            var formattedAddress = jsonDoc.RootElement
                .GetProperty("results")[0]
                .GetProperty("formatted_address")
                .GetString();

            return Ok(new { formattedAddress });
           
        }
    }
}
