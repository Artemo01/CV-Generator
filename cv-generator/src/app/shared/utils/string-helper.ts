export class StringHelper {
  public static isNullEmptyOrWhiteSpace(value: string): boolean {
    if (value == null) return true;
    if (typeof value !== 'string') return true;
    if (value.trim().length <= 0) return true;
    return false;
  }
}
