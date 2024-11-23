namespace CVGeneratorService.Models;

public class CvDocumentModel
{
    public AboutMe AboutMe { get; set; }
    public Contact Contact { get; set; }
    public LanguageSection LanguageSection { get; set; }
    public EducationSection EducationSection { get; set; }
    public WorkExperienceSection WorkExperienceSection { get; set; }
    public IList<SkillSection> SkillSections { get; set; }
}