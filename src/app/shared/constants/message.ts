export function message(data:string, action: string, success: boolean): string {
    if (success) {
        return `${data} ha sido ${action} correctamente.`;
    }else{
        return `Error al ${action} ${data}.`;
    }
}