using CVGeneratorService.Models;
using CVGeneratorService.Utils;
using QuestPDF.Fluent;
using QuestPDF.Helpers;

namespace CVGeneratorService.Builders;

public static class LanguagesSectionBuilder
{
    public static void Build(ColumnDescriptor column, LanguageSection languages)
    {
        var textColor = ColumnHelper.GetTextColor(languages.ColumnPosition);
        
        SectionHeaderBuilder.DisplayHeader(column, languages.ColumnPosition, "Languages", textColor);
        
        foreach (var language in languages.Languages)
        {
            var proficiency = MapLanguageLevelToString(language.ProficiencyLevel);
            column.Item()
                .Text($"{language.LanguageName} - {proficiency}")
                .FontColor(textColor);
        }
        
        if (languages.ColumnPosition == ColumnPosition.Right)
        {
            column.Item().PaddingTop(10);
        }
    }

    private static string MapLanguageLevelToString(LanguageProficiencyLevel languageLevel)
    {
        return languageLevel switch
        {
            LanguageProficiencyLevel.Fluent => "Fluent",
            LanguageProficiencyLevel.Advanced => "Advanced",
            LanguageProficiencyLevel.Beginner => "Beginner",
            LanguageProficiencyLevel.Intermediate => "Intermediate",
            LanguageProficiencyLevel.Native => "Native",
            _ => "Unknown"
        };
    }
}