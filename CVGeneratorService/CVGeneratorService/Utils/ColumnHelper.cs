using CVGeneratorService.Models;
using QuestPDF.Helpers;

namespace CVGeneratorService.Utils;

public static class ColumnHelper
{
    public static string GetTextColor(ColumnPosition columnPosition)
    {
        return columnPosition == ColumnPosition.Left ? Colors.White : Colors.Black;
    }
}