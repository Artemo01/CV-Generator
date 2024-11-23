namespace CVGeneratorService.Models;

public class ColumnPositionModel
{
    public ColumnPosition ColumnPosition { get; set; }
}

public enum ColumnPosition
{
    Left,
    Right
}