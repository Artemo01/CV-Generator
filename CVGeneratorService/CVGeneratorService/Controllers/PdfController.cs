using CVGeneratorService.Models;
using CVGeneratorService.Services.API;
using Microsoft.AspNetCore.Mvc;
using QuestPDF.Fluent;

namespace CVGeneratorService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PdfController : ControllerBase
{
    private readonly IPdfService _pdfService;
    
    public PdfController(IPdfService pdfService)
    {
        _pdfService = pdfService;
    }
    
    [HttpGet("generate")]
    public IActionResult GeneratePdf()
    {
        var programmingSkills = new List<Skill>
        {
            new() { SkillName = "React", SkillLevel = 4 },
            new() { SkillName = "JavaScript", SkillLevel = 5 },
            new() { SkillName = "TypeScript", SkillLevel = 4 },
            new() { SkillName = "HTML", SkillLevel = 5 },
            new() { SkillName = "CSS", SkillLevel = 5 },
            new() { SkillName = "Flutter", SkillLevel = 4 },
            new() { SkillName = "Dart", SkillLevel = 4 },
            new() { SkillName = "Python", SkillLevel = 3 },
            new() { SkillName = "C#", SkillLevel = 4 },
            new() { SkillName = "SQL", SkillLevel = 3 },
            new() { SkillName = "Git", SkillLevel = 4 },
        };
        
        var cvDocumentMode = new CvDocumentModel
        {
            AboutMe = new AboutMe 
            { 
                ColumnPosition = ColumnPosition.Left,
                FirstName = "John",  // Zmieniono na fikcyjne imię
                LastName = "Doe",    // Zmieniono na fikcyjne nazwisko
                Job = "Software Engineer", // Zmieniono na fikcyjny zawód
                AboutMeText =
                    "Passionate software engineer with a love for coding and learning new technologies. Always eager to take on new challenges and improve problem-solving skills."
            },
            Contact = new Contact
            {
                Born = new DateTime(1990, 5, 15),  // Zmieniono datę urodzenia
                Address = "123 Fake Street, Faketown, FT 12345", // Zmieniono adres
                Email = "john.doe@example.com", // Zmieniono email
                Phone = "555-1234-5678", // Zmieniono numer telefonu
            },
            LanguageSection = new LanguageSection
            {
                ColumnPosition = ColumnPosition.Left,
                Languages = new List<Language>
                {
                    new() { LanguageName = "English", ProficiencyLevel = LanguageProficiencyLevel.Native },
                    new() { LanguageName = "Spanish", ProficiencyLevel = LanguageProficiencyLevel.Fluent },
                    new() { LanguageName = "French", ProficiencyLevel = LanguageProficiencyLevel.Beginner }
                }
            },
            EducationSection = new EducationSection
            {
                ColumnPosition = ColumnPosition.Right,
                Educations = new List<Education>
                {
                    new()
                    {
                        StartDate = new DateTime(2010, 9, 1), 
                        EndDate = new DateTime(2014, 6, 1),
                        InstitutionType = "Faketown University", // Zmieniono na fikcyjną uczelnię
                        DegreeTitle = "Bachelor's Degree",
                        Faculty = "Faculty of Computer Science",
                        AdditionalInfo = "Graduated with honors"
                    },
                    new()
                    {
                        StartDate = new DateTime(2015, 9, 1), 
                        EndDate = new DateTime(2017, 6, 1),
                        InstitutionType = "Faketown University", // Zmieniono na fikcyjną uczelnię
                        DegreeTitle = "Master's Degree",
                        Faculty = "Faculty of Software Engineering",
                        AdditionalInfo = "Specialization in Machine Learning"
                    }
                }
            },
            WorkExperienceSection = new WorkExperienceSection
            {
                ColumnPosition = ColumnPosition.Right,
                WorkExperiences = new List<WorkExperience>
                {
                    new()
                    {
                        StartDate = new DateTime(2015, 6, 1),
                        EndDate = new DateTime(2018, 6, 1),
                        CompanyName = "TechCorp", // Zmieniono na fikcyjną firmę
                        Position = "Junior Developer", // Zmieniono na fikcyjny tytuł
                        ExperienceDescriptions = new List<string> {"Worked on web applications", "Collaborated with a cross-functional team", "Participated in agile sprint planning"}
                    },
                    new()
                    {
                        StartDate = new DateTime(2018, 7, 1),
                        EndDate = new DateTime(2023, 1, 1),
                        CompanyName = "CodeWorks", // Zmieniono na fikcyjną firmę
                        Position = "Senior Developer", // Zmieniono na fikcyjny tytuł
                        ExperienceDescriptions = new List<string> {"Led a team of developers", "Developed REST APIs", "Improved software performance and scalability"}
                    }
                }
            },
            SkillSections = new List<SkillSection>
            {
                new()
                {
                    ColumnPosition = ColumnPosition.Right,
                    sectionName = "Programming Languages",
                    skills = programmingSkills,
                    showLevel = true
                },
                new()
                {
                    ColumnPosition = ColumnPosition.Right,
                    sectionName = "Frameworks & Tools",
                    skills = new List<Skill>
                    {
                        new() { SkillName = "React", SkillLevel = 4 },
                        new() { SkillName = "Node.js", SkillLevel = 4 },
                        new() { SkillName = "MongoDB", SkillLevel = 3 },
                        new() { SkillName = "Docker", SkillLevel = 3 },
                    },
                    showLevel = false
                }
            }
        };
            
        var document = _pdfService.GenerateSamplePdf(cvDocumentMode);
        var pdf = document.GeneratePdf();
        return File(pdf, "application/pdf", "FakeCV.pdf");
    }
}
