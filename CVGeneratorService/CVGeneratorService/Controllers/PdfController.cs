using CVGeneratorService.Models;
using CVGeneratorService.Services.API;
using Microsoft.AspNetCore.Mvc;
using QuestPDF.Fluent;

namespace CVGeneratorService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PdfController : ControllerBase
{
    private readonly IPdfService _pdfService;
    
    public PdfController(IPdfService pdfService)
    {
        _pdfService = pdfService;
    }
    
    [HttpPost("generate")]
    public IActionResult GeneratePdf([FromBody] CvDocumentModel documentModel)
    {
        
            
        var document = _pdfService.GenerateSamplePdf(documentModel);
        var pdf = document.GeneratePdf();
        return File(pdf, "application/pdf", "FakeCV.pdf");
    }
}
