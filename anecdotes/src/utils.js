export const findMax = (data) => {
    let maxIdx = -1;
    let max = -1;
    for (let i = 0; i < data.length; i++) {
        if (data[i] > max) {
            max = data[i];
            maxIdx = i;
        }
    }
    return [maxIdx, max];
}