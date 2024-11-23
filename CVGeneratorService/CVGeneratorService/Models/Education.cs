namespace CVGeneratorService.Models;

public class Education
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Faculty { get; set; }
    public string DegreeTitle { get; set; }
    public string InstitutionType { get; set; }
    public string AdditionalInfo { get; set; }
}

public class EducationSection : ColumnPositionModel
{
    public IList<Education> Educations { get; set; }
}