using CVGeneratorService.Translations;

namespace CVGeneratorService.Utils;

public static class TranslationsHelper
{
    public static string GetTranslation(string key, string language)
    {
        var translationsType = GetTranslationType(language);
        var fieldInfo = translationsType.GetField(key);
        return fieldInfo?.GetValue(null)?.ToString() ?? key;
    }
    
    private static Type GetTranslationType(string language)
    {
        return language switch
        {
            "pl" => typeof(TranslationsPl),
            "en" => typeof(TranslationsEn),
            _ => typeof(TranslationsEn)
        };
    }
}