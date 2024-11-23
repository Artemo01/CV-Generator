using CVGeneratorService.Models;
using QuestPDF.Infrastructure;

namespace CVGeneratorService.Services.API;

public interface IPdfService
{
    IDocument GenerateSamplePdf(CvDocumentModel cvDocument);
}