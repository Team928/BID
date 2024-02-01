export function formatDateTime(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    
    // 시간과 분 추출
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}