namespace CVGeneratorService.Models;

public class Contact : ColumnPositionModel
{
    public string Email { get; set; }
    public string Phone { get; set; }
    public DateTime Born { get; set; }
    public string Address { get; set; }
}