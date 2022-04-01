const INTERPOLATION_ITERATION = 10;
const OFF_ROAD_DISTANCE_KM = 0.05;

export function snapToPolyline(polylines, currentCoordinates) {
    if (!currentCoordinates) return;

    let allPolylines = [];

    for (let i = 0; i < polylines.length; i++) {
        allPolylines.push(...polylines[i].polyline);
    }

    let minDistance = Infinity;
    let closestPoint = {
        latitude: 0,
        longitude: 0,
        index: 0,
    };

    for (let i = 0; i < allPolylines.length; i++) {
        let distance = getDistanceFromLatLonInKm(
            allPolylines[i].latitude,
            allPolylines[i].longitude,
            currentCoordinates.latitude,
            currentCoordinates.longitude,
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestPoint.latitude = allPolylines[i].latitude;
            closestPoint.longitude = allPolylines[i].longitude;
            closestPoint.index = i;
        }
    }

    let interpolatedCoordinatesOnPolyline = interpolatePolyline(
        allPolylines,
        closestPoint,
        currentCoordinates,
        undefined,
        INTERPOLATION_ITERATION,
    );

    let distanceBetweenCurrentAndInterpolated = getDistanceFromLatLonInKm(
        interpolatedCoordinatesOnPolyline.latitude,
        interpolatedCoordinatesOnPolyline.longitude,
        currentCoordinates.latitude,
        currentCoordinates.longitude,
    );

    return {
        interpolatedCoordinatesOnPolyline: interpolatedCoordinatesOnPolyline,
        distance: distanceBetweenCurrentAndInterpolated,
        offRoad: distanceBetweenCurrentAndInterpolated > OFF_ROAD_DISTANCE_KM,
    };
}

function interpolatePolyline(allPolylines, closestPoint, currentLocation, candidate, iteration) {
    if (iteration === 0) return closestPoint;

    if (allPolylines.length === 0) {
        return closestPoint;
    }

    if (!candidate) {
        candidate = {
            latitude: 0,
            longitude: 0,
            index: 0,
        };

        if (closestPoint.index === 0) {
            candidate.latitude = allPolylines[closestPoint.index + 1].latitude;
            candidate.longitude = allPolylines[closestPoint.index + 1].longitude;
            candidate.index = closestPoint.index + 1;
        } else if (closestPoint.index === allPolylines.length - 1) {
            candidate.latitude = allPolylines[closestPoint.index - 1].latitude;
            candidate.longitude = allPolylines[closestPoint.index - 1].longitude;
            candidate.index = closestPoint.index - 1;
        } else {
            let distance = getDistanceFromLatLonInKm(
                allPolylines[closestPoint.index - 1].latitude,
                allPolylines[closestPoint.index - 1].longitude,
                currentLocation.latitude,
                currentLocation.longitude,
            );

            let distance2 = getDistanceFromLatLonInKm(
                allPolylines[closestPoint.index + 1].latitude,
                allPolylines[closestPoint.index + 1].longitude,
                currentLocation.latitude,
                currentLocation.longitude,
            );

            if (distance < distance2) {
                candidate.latitude = allPolylines[closestPoint.index - 1].latitude;
                candidate.longitude = allPolylines[closestPoint.index - 1].longitude;
                candidate.index = closestPoint.index - 1;
            } else {
                candidate.latitude = allPolylines[closestPoint.index + 1].latitude;
                candidate.longitude = allPolylines[closestPoint.index + 1].longitude;
                candidate.index = closestPoint.index + 1;
            }
        }
    }

    let middlePoint = {
        latitude: (closestPoint.latitude + candidate.latitude) / 2,
        longitude: (closestPoint.longitude + candidate.longitude) / 2,
    };

    let closest, secondClosest;

    let closestDistance = getDistanceFromLatLonInKm(
        closestPoint.latitude,
        closestPoint.longitude,
        currentLocation.latitude,
        currentLocation.longitude,
    );
    let middlePointDistance = getDistanceFromLatLonInKm(
        middlePoint.latitude,
        middlePoint.longitude,
        currentLocation.latitude,
        currentLocation.longitude,
    );
    let candidateDistance = getDistanceFromLatLonInKm(
        candidate.latitude,
        candidate.longitude,
        currentLocation.latitude,
        currentLocation.longitude,
    );

    if (closestDistance < middlePointDistance && closestDistance < candidateDistance) {
        closest = "closest";
    } else if (middlePointDistance < closestDistance && middlePointDistance < candidateDistance) {
        closest = "middle";
    } else {
        closest = "candidate";
    }

    if (closest === "closest" || closest === "candidate") {
        secondClosest = "middle";
    } else {
        if (closestDistance < candidateDistance) {
            secondClosest = "closest";
        } else {
            secondClosest = "candidate";
        }
    }

    let closestCoordinates, secondClosestCoordinates;

    if (closest === "closest") {
        closestCoordinates = {
            latitude: closestPoint.latitude,
            longitude: closestPoint.longitude,
        };
    } else if (closest === "candidate") {
        closestCoordinates = {
            latitude: candidate.latitude,
            longitude: candidate.longitude,
        };
    } else {
        closestCoordinates = {
            latitude: middlePoint.latitude,
            longitude: middlePoint.longitude,
        };
    }

    if (secondClosest === "closest") {
        secondClosestCoordinates = {
            latitude: closestPoint.latitude,
            longitude: closestPoint.longitude,
        };
    } else if (secondClosest === "candidate") {
        secondClosestCoordinates = {
            latitude: candidate.latitude,
            longitude: candidate.longitude,
        };
    } else {
        secondClosestCoordinates = {
            latitude: middlePoint.latitude,
            longitude: middlePoint.longitude,
        };
    }

    return interpolatePolyline(
        allPolylines,
        closestCoordinates,
        currentLocation,
        secondClosestCoordinates,
        iteration - 1,
    );
}

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
