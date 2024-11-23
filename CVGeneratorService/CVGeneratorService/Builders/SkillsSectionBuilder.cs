using CVGeneratorService.Models;
using CVGeneratorService.Utils;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace CVGeneratorService.Builders;

public static class SkillsSectionBuilder
{
    public static void Build(ColumnDescriptor column, SkillSection skillSection)
    {
        var textColor = ColumnHelper.GetTextColor(skillSection.ColumnPosition);
        
        SectionHeaderBuilder.DisplayHeader(column, skillSection.ColumnPosition, skillSection.sectionName, textColor);

        column.Item().Row(skillsRow =>
                        {
                            skillsRow.RelativeItem().Column(skillColumnLeft =>
                            {
                                foreach (var skill in skillSection.skills.Take(skillSection.skills.Count / 2))
                                {
                                    DisplaySkill(skill, skillColumnLeft, skillSection.showLevel, textColor);
                                }
                            });
                            skillsRow.RelativeItem().Column(skillColumnRight =>
                            {
                                foreach (var skill in skillSection.skills.Skip(skillSection.skills.Count / 2))
                                {
                                    DisplaySkill(skill, skillColumnRight, skillSection.showLevel, textColor);
                                }
                            });
                        });
    }

    private static void DisplaySkill(Skill skill, ColumnDescriptor column, bool showLevel, Color textColor)
    {
        column.Item().Row(row =>
        {
            row.RelativeItem(2).Text(skill.SkillName).FontSize(11).FontColor(textColor);
            if (showLevel)
            {
                row.RelativeItem(3).Row(rowLevel =>
                {
                    DisplaySkillLevel(skill, rowLevel);
                });
            }
        });
    }

    private static void DisplaySkillLevel(Skill skill, RowDescriptor row)
    {
        for (int i = 0; i < 5; i++)
        {
            row.ConstantItem(10).Height(10)
                .Background(i < skill.SkillLevel ? Colors.Black : Colors.Grey.Lighten2);

        }
    }
}