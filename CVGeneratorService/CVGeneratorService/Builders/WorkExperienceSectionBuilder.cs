using CVGeneratorService.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;

namespace CVGeneratorService.Builders;

public static class WorkExperienceSectionBuilder
{
    public static void Build(ColumnDescriptor column, WorkExperienceSection workExperience)
    {
        column.Item().Text("Work Experience").FontSize(16).Bold().FontColor(Colors.Black);
        column.Item().LineHorizontal(1).LineColor(Colors.Grey.Medium);
        column.Item().PaddingTop(10);
        
        DisplayWorkExperience(column, workExperience.WorkExperiences);
    }

    private static void DisplayWorkExperience(ColumnDescriptor column, IList<WorkExperience> workExperience)
    {
        foreach (var experience in workExperience)
        {
            var  workPeriod = $"{experience.StartDate:yyyy} - {experience.EndDate:yyyy}";
            var companyWithPositionDescription = $"{experience.CompanyName} - {experience.Position}";
            
            column.Item().Text(workPeriod).FontSize(10).FontColor(Colors.Grey.Medium);
            column.Item().Text(companyWithPositionDescription).FontSize(10).Bold();
            DisplayWorkExperienceDescription(column, experience.ExperienceDescriptions);
            column.Item().PaddingTop(10);
        }
    }

    private static void DisplayWorkExperienceDescription(ColumnDescriptor column, IList<string> experienceDescription)
    {
        foreach (var item in experienceDescription)
        {
            column.Item().Text($"- {item}").FontSize(10);
        }
    }
}