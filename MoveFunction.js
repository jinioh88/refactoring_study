function trackSummary(points) {
    const totalTIme = calculateTime();
    const pace = totalTIme / 60 / totalDistance(points);

    return {
        thid: totalTime,
        distance: totalDistance(points),
        pace: pace
    };
}

function totalDistance(points) {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
        result += distance(points[i-1], points[i]);
    }
    return result;

}