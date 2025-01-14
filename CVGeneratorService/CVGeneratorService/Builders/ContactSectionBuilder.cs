using CVGeneratorService.Models;
using CVGeneratorService.Utils;
using QuestPDF.Fluent;
using QuestPDF.Helpers;

namespace CVGeneratorService.Builders;

public static class ContactSectionBuilder
{
    public static void Build(ColumnDescriptor column, Contact contact)
    {
        var sectionTitle = TranslationsHelper.GetTranslation("Contact", "pl");
        var email = $"Email: {contact.Email}";
        var phone = $"Phone: {contact.Phone}";
        var address = $"Address: {contact.Address}";
        var born = $"Born on {contact.Born:dd/MM/yyyy}";
        
        column.Item().AlignCenter().PaddingTop(10).Text(sectionTitle).Bold().FontColor(Colors.White);
        column.Item().Text(born).FontColor(Colors.White);
        column.Item().Text(email).FontColor(Colors.White);
        column.Item().Text(phone).FontColor(Colors.White);
        column.Item().Text(address).FontColor(Colors.White);
    }
}