export function formatCurrencyToLocal(amount: number) {
    const { format } = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"

    })
    return format(amount)
}

export function formatDateShort(date: Date) {
    const { format } = new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    })
    return format(new Date(date))
}

export function convertValuesIntoCents(value: string) {
    const valueTreat = value.split("");

    const valueNumber = valueTreat.filter((value) => {
        if (Number(value) || value === "0" || value === ",") return value;
    });
    if (!valueNumber.length) return false;

    let valueCents = valueNumber.reduce((acum, value) => acum + value);
    valueCents = valueCents.replace(",", ".");
    return Number(valueCents) * 100;
}