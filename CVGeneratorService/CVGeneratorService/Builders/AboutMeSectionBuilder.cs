using CVGeneratorService.Models;
using CVGeneratorService.Utils;
using QuestPDF.Fluent;
using QuestPDF.Helpers;

namespace CVGeneratorService.Builders;

public static class AboutMeSectionBuilder
{
    public static void Build(ColumnDescriptor column, AboutMe aboutMe)
    {
        
        var name = $"{aboutMe.FirstName} {aboutMe.LastName}";
        var textColor = ColumnHelper.GetTextColor(aboutMe.ColumnPosition);
        
        column.Item().AlignCenter().Text(name).FontSize(14).Bold().FontColor(textColor);
        column.Item().AlignCenter().Text(aboutMe.Job).FontColor(textColor);

        var sectionTitle = TranslationsHelper.GetTranslation("AboutMe", "pl");
        SectionHeaderBuilder.DisplayHeader(column, aboutMe.ColumnPosition, sectionTitle, textColor);
        column.Item().Text(aboutMe.AboutMeText).FontColor(textColor);

        if (aboutMe.ColumnPosition == ColumnPosition.Right)
        {
            column.Item().PaddingTop(10);
        }
    }
}