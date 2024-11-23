namespace CVGeneratorService.Models;

public class Language
{
    public string LanguageName { get; set; }
    public LanguageProficiencyLevel ProficiencyLevel { get; set; }
}

public class LanguageSection : ColumnPositionModel
{
    public IList<Language> Languages { get; set; }
}


public enum LanguageProficiencyLevel
{
    Beginner,
    Intermediate,
    Advanced,
    Fluent,
    Native
}