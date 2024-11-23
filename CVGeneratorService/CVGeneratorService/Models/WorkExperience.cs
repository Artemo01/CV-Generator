namespace CVGeneratorService.Models;

public class WorkExperience
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string CompanyName { get; set; }
    public string Position { get; set; }
    public IList<string> ExperienceDescriptions { get; set; }
}

public class WorkExperienceSection : ColumnPositionModel
{
    public IList<WorkExperience> WorkExperiences { get; set; }
}