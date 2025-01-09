using CVGeneratorService.Models;
using CVGeneratorService.Utils;
using QuestPDF.Fluent;
using QuestPDF.Helpers;

namespace CVGeneratorService.Builders;

public static class EducationSectionBuilder
{
    public static void Build(ColumnDescriptor column, EducationSection educations)
    {
        var sectionTitle = TranslationsHelper.GetTranslation("Education", "pl");
        column.Item().Text(sectionTitle).FontSize(16).Bold().FontColor(Colors.Black);
        column.Item().LineHorizontal(1).LineColor(Colors.Grey.Medium);
        column.Item().PaddingTop(10);
        
        foreach (var education in educations.Educations)
        {
            CreateEducationElement(column, education);
        }
    }

    private static void CreateEducationElement(ColumnDescriptor column, Education education)
    {
        var educationPeriod = $"{education.StartDate:yyyy} - {education.EndDate:yyyy}";
        var educationLevel = $"{education.InstitutionType} - {education.DegreeTitle}";
        
        column.Item().Text(educationPeriod).FontSize(10).FontColor(Colors.Grey.Medium);
        column.Item().Text(educationLevel).FontSize(10).Bold();
        column.Item().Text(education.Faculty)
            .FontSize(10);
        column.Item().Text(education.AdditionalInfo).FontSize(10);
        column.Item().PaddingTop(10);
    }
}