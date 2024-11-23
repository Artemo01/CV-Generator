using CVGeneratorService.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace CVGeneratorService.Builders;

public static class SectionHeaderBuilder
{
    public static void DisplayHeader(ColumnDescriptor column, ColumnPosition columnPosition, string sectionName, Color textColor)
    {
        switch (columnPosition)
        {
            case ColumnPosition.Left:
                column.Item().AlignCenter().PaddingTop(10).Text(sectionName).Bold().FontColor(textColor);
                break;
            case ColumnPosition.Right:
                column.Item().Text(sectionName).FontSize(16).Bold().FontColor(textColor);
                column.Item().LineHorizontal(1).LineColor(Colors.Grey.Medium);
                column.Item().PaddingTop(10);
                break;
        }
    }
}