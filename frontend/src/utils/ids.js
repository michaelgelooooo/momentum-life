export function generateId(prefix = "") {
    const uuid = crypto.randomUUID?.();

    if (uuid) {
        return `${prefix}-${uuid}`;
    }

    return `${prefix}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 11)}`;
}