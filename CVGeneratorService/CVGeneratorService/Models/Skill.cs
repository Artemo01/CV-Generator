namespace CVGeneratorService.Models;

public class Skill
{
    public string SkillName { get; set; }
    public int SkillLevel { get; set; }
}

public class SkillSection : ColumnPositionModel
{
    public string sectionName { get; set; }
    public IList<Skill> skills { get; set; }
    public bool showLevel { get; set; }
}