export default function getDateWithOffset(date : string, offset : number) {
    const currentDate = new Date(date.replace(/-/g, "/"));
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate() - offset).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
