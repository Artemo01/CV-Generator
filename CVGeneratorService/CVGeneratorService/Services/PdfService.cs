using CVGeneratorService.Builders;
using CVGeneratorService.Models;
using CVGeneratorService.Services.API;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace CVGeneratorService.Services;

public class PdfService : IPdfService
{
    public IDocument GenerateSamplePdf(CvDocumentModel cvDocument)
    {
        var imageBytes = cvDocument.AboutMe.ProfileImage ?? Array.Empty<byte>(); 
        
        var (leftColumn, rightColumn) = SplitIntoColumns(cvDocument);

        return Document.Create(container =>
        {
            container.Page(page =>
            {
                ConfigurePage(page);

                page.Content().Row(row =>
                {
                    row.RelativeItem(1).Background(Colors.Blue.Darken2).Padding(10).Column(col =>
                    {
                        col.Item().AlignCenter().Image(imageBytes).FitWidth();

                        foreach (var item in leftColumn)
                        {
                            RenderSection(item, col);
                        }
                    });

                    row.RelativeItem(2).Background(Colors.White).Padding(10).Column(col =>
                    {
                        foreach (var item in rightColumn)
                        {
                            RenderSection(item, col);
                        }
                    });
                });
            });
        });
    }

    
    private void ConfigurePage(PageDescriptor page)
    {
        page.Size(PageSizes.A4);
        page.DefaultTextStyle(x => x.FontSize(11).FontFamily("Arial"));
    }
    
    private byte[] LoadProfileImage(string filePath)
    {
        return File.Exists(filePath) ? File.ReadAllBytes(filePath) : [];
    }

    private (IList<object> LeftColumn, IList<object> RightColumn) SplitIntoColumns(CvDocumentModel cvDocument)
    {
        var leftColumn = new List<object>();
        var rightColumn = new List<object>();

        var properties = cvDocument.GetType().GetProperties();

        foreach (var property in properties)
        {
            var value = property.GetValue(cvDocument);
            if (value is ColumnPositionModel model)
            {
                   
                if (model.ColumnPosition == ColumnPosition.Left)
                {
                    leftColumn.Add(model);
                }
                else if (model.ColumnPosition == ColumnPosition.Right)
                {
                    rightColumn.Add(model);
                }
            }
            else if (value is IList<SkillSection> skillSections)
            {
                foreach (var section in skillSections)
                {
                    if (section.ColumnPosition == ColumnPosition.Left)
                        leftColumn.Add(section);
                    else if (section.ColumnPosition == ColumnPosition.Right)
                        rightColumn.Add(section);
                }
            }
        }
        return (LeftColumn: leftColumn, RightColumn: rightColumn);
    }
    
    private void RenderSection(object section, ColumnDescriptor col)
    {
        switch (section)
        {
            case AboutMe aboutMe:
                AboutMeSectionBuilder.Build(col, aboutMe);
                break;
            case Contact contact:
                ContactSectionBuilder.Build(col, contact);
                break;
            case LanguageSection languageSection:
                LanguagesSectionBuilder.Build(col, languageSection);
                break;
            case EducationSection educationSection:
                EducationSectionBuilder.Build(col, educationSection);
                break;
            case WorkExperienceSection workExperienceSection:
                WorkExperienceSectionBuilder.Build(col, workExperienceSection);
                break;
            case SkillSection skillSection:
                SkillsSectionBuilder.Build(col, skillSection);
                break;
            default:
                throw new ArgumentException($"Unsupported section type: {section.GetType()}");
        }
    }
}